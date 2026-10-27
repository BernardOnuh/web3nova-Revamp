// Server-only: turns a Monnify transaction into a bootcamp registration,
// checking that it was paid in full for the location that was chosen.
import { findCourse, findLocation } from "@/lib/bootcamp";

export const REFERENCE_PREFIX = "W3N-BC-";

export function toRegistration(tx) {
  const meta = tx.metaData || {};
  const course = findCourse(meta.courseId);
  const location = findLocation(meta.locationId);
  const amountPaid = Number(tx.amountPaid || 0);
  const programFee = Number(meta.programFee || location?.price || 0);
  const serviceCharge = Number(meta.serviceCharge || 0);
  const expected = Math.max(Number(meta.total || 0), location?.price || 0);
  const paid =
    tx.paymentStatus === "PAID" && !!location && amountPaid >= expected;

  return {
    paid,
    status: tx.paymentStatus,
    paymentReference: tx.paymentReference,
    name: meta.name || tx.customer?.name || "",
    email: tx.customer?.email || tx.customerEmail || "",
    phone: meta.phone || "",
    school: meta.school || "",
    course: course?.title || meta.courseId || "",
    location: location?.title || meta.locationId || "",
    amount: amountPaid,
    programFee,
    serviceCharge,
  };
}
