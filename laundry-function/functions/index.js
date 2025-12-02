const functions = require("firebase-functions");
const twilio = require("twilio");

// IMPORTANT: Store your credentials securely using environment configuration.
// In your terminal, run these commands:
// firebase functions:config:set twilio.sid="YOUR_ACCOUNT_SID"
// firebase functions:config:set twilio.token="YOUR_AUTH_TOKEN" // Make sure this is your WhatsApp-enabled number or sandbox number
// firebase functions:config:set twilio.number="YOUR_TWILIO_PHONE_NUMBER"

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const twilioNumber = functions.config().twilio.number;

// FIX 1: Removed 'new'. Twilio is a factory function, not a class.
// This fixes the 'new-cap' error and ensures the library works correctly.
const client = twilio(accountSid, authToken);

exports.sendSmsNotification = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated to prevent abuse
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated.",
    );
  }

  const customerName = data.customerName;
  const customerPhone = data.customerPhone;
  const orderTotal = data.orderTotal;

  if (!customerName || !customerPhone || !orderTotal) {
    // FIX 2: Broken long line into two lines and added trailing comma
    throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with customerName, " +
        "customerPhone, and orderTotal.",
    );
  }

  // Format the phone number to E.164 format for Twilio
  // This example assumes Nigerian numbers. Adjust the country code if needed.
  const formattedPhone = customerPhone.startsWith("+") ?
    customerPhone : `+234${customerPhone.substring(1)}`;

  // FIX 3: Broken long line into multiple lines using concatenation (+)
  // I also added ${customerName} and ${orderTotal} which were missing.
  const messageBody = `Hello ${customerName}, your laundry order is ` +
    `ready for pickup! The total amount is ${orderTotal}. ` +
    "Thank you for choosing Bumba Businesses Ventures.";

  try {
    const message = await client.messages.create({
      to: `whatsapp:${formattedPhone}`, // Add 'whatsapp:' prefix
      from: `whatsapp:${twilioNumber}`, // Add 'whatsapp:' prefix
      body: messageBody,
    });

    console.log(`Message sent successfully with SID: ${message.sid}`);
    return {success: true, messageSid: message.sid};
  } catch (error) {
    console.error("Error sending SMS via Twilio:", error);
    // FIX 4: Added trailing comma
    throw new functions.https.HttpsError(
        "internal",
        "Failed to send SMS.",
        error,
    );
  }
});
