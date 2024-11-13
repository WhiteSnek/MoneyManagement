export const checkPasswordStrength = (password: string) => {
    const lengthCriteria = /.{8,}/;  // At least 8 characters
    const numberCriteria = /\d/;  // Must contain at least one number
    const uppercaseCriteria = /[A-Z]/;  // Must contain at least one uppercase letter
    const lowercaseCriteria = /[a-z]/;  // Must contain at least one lowercase letter
    const specialCharCriteria = /[!@#$%^&*(),.?":{}|<>]/;  // Must contain at least one special character
  
    let score = 0;
    
    if (lengthCriteria.test(password)) score++;
    if (numberCriteria.test(password)) score++;
    if (uppercaseCriteria.test(password)) score++;
    if (lowercaseCriteria.test(password)) score++;
    if (specialCharCriteria.test(password)) score++;
    
    if (score === 1) return 'weak';
    if (score === 2 || score === 3) return 'medium';
    if (score >= 4) return 'strong';
    
    return 'weak';
  };
  