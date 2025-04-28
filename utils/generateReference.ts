// /utils/generateReference.ts

/**
 * Generates a unique appointment reference
 * Format: [DoctorPrefix]-[RandomNumber]-[Timestamp]
 * 
 * @param doctorName - The name of the doctor for the appointment
 * @returns A unique appointment reference string
 */
export function generateAppointmentReference(doctorName: string): string {
    // Get the first 3 letters of the doctor's name in uppercase
    const doctorPrefix = doctorName.substring(0, 3).toUpperCase();
    
    // Generate a 6-digit random number
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    
    // Create timestamp part (last 4 digits of timestamp)
    const timestamp = Date.now().toString().slice(-4);
    
    // Combine to create reference
    return `${doctorPrefix}-${randomNum}-${timestamp}`;
  }
  
  /**
   * Validates if a reference is in the correct format
   * 
   * @param reference - The reference string to validate
   * @returns boolean indicating if the reference is valid
   */
  export function isValidReference(reference: string): boolean {
    // Check format: 3 uppercase letters, hyphen, 6 digits, hyphen, 4 digits
    const referencePattern = /^[A-Z]{3}-\d{6}-\d{4}$/;
    return referencePattern.test(reference);
  }