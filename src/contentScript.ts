function scrapeLinkedInProfile() {
  const name = document.querySelector('.text-heading-xlarge')?.textContent?.trim() || '';
  const title = document.querySelector('.text-body-medium')?.textContent?.trim() || '';
  
  const experienceElements = document.querySelectorAll('.experience-section .pv-entity__summary-info');
  const experience = Array.from(experienceElements).map(el => ({
    title: el.querySelector('h3')?.textContent?.trim() || '',
    company: el.querySelector('.pv-entity__secondary-title')?.textContent?.trim() || '',
    duration: el.querySelector('.pv-entity__date-range span:nth-child(2)')?.textContent?.trim() || ''
  }));

  const skillElements = document.querySelectorAll('.pv-skill-category-entity__name-text');
  const skills = Array.from(skillElements).map(el => el.textContent?.trim() || '');

  const educationElements = document.querySelectorAll('.education-section .pv-entity__summary-info');
  const education = Array.from(educationElements).map(el => ({
    school: el.querySelector('h3')?.textContent?.trim() || '',
    degree: el.querySelector('.pv-entity__degree-name .pv-entity__comma-item')?.textContent?.trim() || '',
    field: el.querySelector('.pv-entity__fos .pv-entity__comma-item')?.textContent?.trim() || ''
  }));

  return {
    name,
    title,
    experience,
    skills,
    education
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeProfile') {
    const profileData = scrapeLinkedInProfile();
    sendResponse({ profile: profileData });
  }
  return true;
});