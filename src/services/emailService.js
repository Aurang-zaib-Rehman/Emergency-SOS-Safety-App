// services/emailService.js
// EmailJS integration for SOS alerts

import emailjs from '@emailjs/browser';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendSOSEmail = async ({ toEmail, toName, fromName, locationLink }) => {
  const templateParams = {
    to_email:      toEmail,
    to_name:       toName,
    from_name:     fromName,
    location_link: locationLink,
    message:       `${fromName} is currently in an emergency situation. Please contact immediately.`,
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  return response;
};

export const sendSOSToAllContacts = async ({ contacts, fromName, locationLink }) => {
  const results = await Promise.allSettled(
    contacts.map((contact) =>
      sendSOSEmail({
        toEmail:      contact.email,
        toName:       contact.name,
        fromName,
        locationLink,
      })
    )
  );
  return results;
};