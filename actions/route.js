"use server";
import connectDB from "@/db/connectdb";
import User from "@/model/User";


export async function checkUsername(username) {
  try {
    await connectDB();
    const user = await User.findOne({ username: username });
    return !!user;
  } catch (error) {
    console.error("Error in checkUsernameAndUid:", error);
    return false;
  }
}

export async function checkPasswordStrength(password) {
  const COMMON_WEAK_PATTERNS = [
    "1234", "12345", "123456", "1234567", "12345678", "123456789",
    "password", "passw0rd", "qwerty", "abc123", "111111", "letmein",
    "iloveyou", "admin", "welcome", "monkey", "dragon",
  ];

  const lowerPass = password.toLowerCase();

  if (COMMON_WEAK_PATTERNS.some(p => lowerPass.includes(p)) || password.length < 8) {
    return "Weak";
  }

  let score = 0;

  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;

  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password) &&
    password.length >= 12
  ) {
    score += 1;
  }

  if (score <= 3) return "Weak";
  return "Strong";
}

