export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@(stud\.noroff\.no|noroff\.no)$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateLoginForm(email, password) {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push("Please enter a noroff.no or stud.noroff.no email address.");
  }

  if (!validatePassword(password)) {
    errors.push(`Password must be at least 8 characters long.`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

export function validateListItemForm(
  title,
  description,
  tags,
  urls,
  endsAt,
  endsAtCheck = false,
) {
  const errors = [];

  if (!title.trim()) {
    errors.push("Title is required.");
  }

  if (!description.trim()) {
    errors.push("Description is required.");
  }

  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (tagList.length === 0) {
    errors.push("Please enter at least one tag.");
  }

  const urlList = urls
    .split(",")
    .map((u) => u.trim())
    .filter((u) => u.length > 0);

  const urlRegex = /^(https?:\/\/)[^\s]+$/i;

  if (urlList.length === 0) {
    errors.push("Please enter at least one media URL.");
  } else {
    urlList.forEach((url) => {
      if (!urlRegex.test(url)) {
        errors.push(`Invalid URL: ${url}`);
      }
    });
  }
  if (endsAtCheck) {
    const date = new Date(endsAt);
    if (!endsAt) {
      errors.push("Date is required.");
    } else {
      const now = new Date();
      if (date <= now) {
        errors.push("End date must be in the future.");
      }
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      if (date > maxDate) {
        errors.push("End date cannot exceed 1 year from today.");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateEditProfileForm(name, bio, email, avatar, banner) {
  const errors = [];

  if (!name.trim()) {
    errors.push("Title is required.");
  }

  if (!bio.trim()) {
    errors.push("Description is required.");
  }
  if (!validateEmail(email)) {
    errors.push("Please enter a noroff.no or stud.noroff.no email address.");
  }

  const urlRegex = /^(https?:\/\/)[^\s]+$/i;
  if (!urlRegex.test(avatar)) {
    errors.push(`Invalid URL of avatar: ${avatar}`);
  }

  if (!urlRegex.test(banner)) {
    errors.push(`Invalid URL Of Banner: ${banner}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
