const projectKnowledge = {
  overview:
    "SwachhPooja helps people report puja waste like flowers, coconuts, and cloth. The team collects it and sends it for composting so roads and public places stay clean.",
  pickup:
    "To request pickup, open the Request Pickup section, fill location and waste details, and submit. The team receives your request and schedules collection.",
  reporting:
    "You can report puja waste by sharing the place and waste details in the request form. After submission, the cleanup team can act on it quickly.",
  composting:
    "Collected puja waste is separated and composted. This helps keep roads clean and supports a greener environment.",
  status:
    "After creating a request, you can check request progress from your activity/dashboard pages where available.",
  support:
    "For help, use the Support or Contact section and share your request details so the team can assist faster.",
  materials:
    "Common puja waste includes flowers, coconuts, leaves, cloth, and other biodegradable offerings. Keep plastic separate if possible.",
};

const intentChecks = [
  { regex: /(what|about|overview|project|swachh|pooja)/i, key: "overview" },
  { regex: /(pickup|collect|booking|request)/i, key: "pickup" },
  { regex: /(report|complain|issue|dump)/i, key: "reporting" },
  { regex: /(compost|recycle|waste|green|environment)/i, key: "composting" },
  { regex: /(status|track|progress|activity)/i, key: "status" },
  { regex: /(flower|coconut|cloth|material|offering|what waste)/i, key: "materials" },
  { regex: /(support|help|contact|phone|email)/i, key: "support" },
];

exports.queryChat = async (req, res) => {
  try {
    const question = (req.body?.message || "").toString().trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const matchedIntent = intentChecks.find((item) => item.regex.test(question));

    const answer = matchedIntent
      ? projectKnowledge[matchedIntent.key]
      : "I can help with pickup requests, waste reporting, composting, request status, waste materials, and support. Ask me in any of these areas.";

    return res.json({
      success: true,
      answer,
      intent: matchedIntent?.key || "general",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Unable to process chat query right now",
    });
  }
};
