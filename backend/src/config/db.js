const mongoose = require('mongoose');

const asBool = (value) => String(value || '').toLowerCase() === 'true';

const buildMemoryDbVersionList = () => {
  const versions = [process.env.MONGOMS_VERSION, '7.0.14', '6.0.18'];
  return [...new Set(versions.filter(Boolean))];
};

const startMemoryDb = async () => {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  const versionList = buildMemoryDbVersionList();
  const startupErrors = [];

  for (const version of versionList) {
    try {
      console.log(`⏳ Trying in-memory MongoDB binary v${version}...`);
      const mongoServer = await MongoMemoryServer.create({
        binary: { version },
        instance: {
          dbName: 'swachhpooja_test',
          storageEngine: 'wiredTiger',
        },
      });

      const uri = mongoServer.getUri();
      console.log(`✅ In-memory MongoDB started with v${version}`);
      return uri;
    } catch (error) {
      startupErrors.push(`v${version}: ${error.message}`);
      console.warn(`⚠️ Failed to start in-memory MongoDB v${version}: ${error.message}`);
    }
  }

  throw new Error(startupErrors.join(' | '));
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    const fallbackUri = process.env.MONGO_FALLBACK_URI || 'mongodb://127.0.0.1:27017/swachhpooja';
    const useInMemoryDb = asBool(process.env.USE_IN_MEMORY_DB);

    if (!uri || !uri.startsWith('mongodb')) {
      if (useInMemoryDb) {
        console.log('\n======================================================');
        console.log('⏳ No MONGO_URI found. Trying in-memory MongoDB (USE_IN_MEMORY_DB=true)...');
        try {
          uri = await startMemoryDb();
          console.log('✅ In-memory MongoDB running at: ' + uri);
        } catch (memoryError) {
          console.warn('⚠️ In-memory DB startup failed. Falling back to local MongoDB URI.');
          console.warn('⚠️ Memory DB error summary:', memoryError.message);
          console.warn('➡️ Fallback URI:', fallbackUri);
          uri = fallbackUri;
        }
        console.log('======================================================\n');
      } else {
        uri = fallbackUri;
        console.log('ℹ️ MONGO_URI not set. Using local Mongo fallback URI:', uri);
        console.log('ℹ️ Set MONGO_URI in .env to use MongoDB Atlas or another remote database.');
      }
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ MongoDB Connected successfully!');
  } catch (err) {
    console.error("MongoDb error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;