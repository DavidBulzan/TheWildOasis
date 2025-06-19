// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { formatCurrency } from "../../utils/helpers";

// function handleInvoice({ activities, bookingId }) {
//   const {
//     id,
//     startDate,
//     endDate,
//     totalPrice,
//     extrasPrice,
//     guest,
//     numNights,
//     numGuests,
//   } = activities?.find((a) => a.id === bookingId) || {};
//   //1 generate pdf
//   const doc = new jsPDF();
//   doc.setFont("Helvetica");

//   //logo header
//   const imgWidth = 50;
//   const imgHeight = 35;
//   doc.addImage(
//     "/logo-light.png",
//     "PNG",
//     (210 - imgWidth) / 2,
//     10,
//     imgWidth,
//     imgHeight
//   );

//   //Table
//   autoTable(doc, {
//     startY: 70,
//     head: [["Field", "Value"]],
//     body: [
//       ["Booking ID", id || ""],
//       ["Guest Name", guest?.fullName || ""],
//       ["Guest Email", guest?.email || ""],
//       ["Number of Guests", numGuests || ""],
//       ["Start Date", startDate || ""],
//       ["End Date", endDate || ""],
//       ["Number of nights stayed", numNights || ""],
//       ["Extras Price", formatCurrency(extrasPrice) || ""],
//       ["Total Price", formatCurrency(totalPrice) || ""],
//     ],
//     theme: "grid",
//     headStyles: { fillColor: [47, 84, 23] },
//   });
//   doc.save(`invoice-booking-${id}.pdf`);
// }

// export default handleInvoice;

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency } from "../../utils/helpers";
import supabase from "../../services/supabase"; // Adjust path as needed

async function handleInvoice({ activities, bookingId, sendEmail = false }) {
  const {
    id,
    startDate,
    endDate,
    totalPrice,
    extrasPrice,
    guest,
    numNights,
    numGuests,
  } = activities?.find((a) => a.id === bookingId) || {};

  if (!guest?.email) {
    throw new Error("Guest email not found");
  }

  // Generate PDF
  const doc = new jsPDF();
  doc.setFont("Helvetica");

  // Logo header
  const imgWidth = 50;
  const imgHeight = 35;
  doc.addImage(
    "/logo-light.png",
    "PNG",
    (210 - imgWidth) / 2,
    10,
    imgWidth,
    imgHeight
  );

  // Table
  autoTable(doc, {
    startY: 70,
    head: [["Field", "Value"]],
    body: [
      ["Booking ID", id || ""],
      ["Guest Name", guest?.fullName || ""],
      ["Guest Email", guest?.email || ""],
      ["Number of Guests", numGuests || ""],
      ["Start Date", startDate || ""],
      ["End Date", endDate || ""],
      ["Number of nights stayed", numNights || ""],
      ["Extras Price", formatCurrency(extrasPrice) || ""],
      ["Total Price", formatCurrency(totalPrice) || ""],
    ],
    theme: "grid",
    headStyles: { fillColor: [47, 84, 23] },
  });

  if (sendEmail) {
    try {
      // Convert PDF to base64
      const pdfBlob = doc.output("blob");
      const pdfBase64 = await blobToBase64(pdfBlob);

      // Send email via Supabase Edge Function
      const { data, error } = await supabase.functions.invoke(
        "send-invoice-email",
        {
          body: {
            to: guest.email,
            guestName: guest.fullName,
            bookingId: id,
            pdfData: pdfBase64,
            filename: `invoice-booking-${id}.pdf`,
          },
        }
      );

      console.log(data);

      if (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send invoice email");
      }

      console.log("Invoice email sent successfully");
      return { success: true, message: "Invoice sent successfully" };
    } catch (error) {
      console.error("Error in email process:", error);
      throw error;
    }
  } else {
    // Download PDF locally
    doc.save(`invoice-booking-${id}.pdf`);
    return { success: true, message: "Invoice downloaded" };
  }
}

// Helper function to convert blob to base64
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default handleInvoice;
