// ========================
// Army Portal Script
// ========================

const SHEET_API = "https://sheetdb.io/api/v1/1nn4gev3bduep";

// ---------- Handle Login ----------
document.addEventListener("DOMContentLoaded", () => {
  const loginModal = document.getElementById("loginModal");
  const loginBtn = document.getElementById("loginBtn");
  const closeLogin = document.getElementById("closeLogin");
  const loginForm = document.getElementById("loginForm");

  // ✅ function to close modal (works for ❌ and Cancel)
  window.closeLoginModal = function () {
    if (loginModal) {
      loginModal.classList.add("hidden");
    }
  };

  if (loginBtn && loginModal) {
    loginBtn.addEventListener("click", () => {
      loginModal.classList.remove("hidden");
    });
  }

  if (closeLogin) {
    closeLogin.addEventListener("click", closeLoginModal);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const userData = Object.fromEntries(formData.entries());

      try {
        // Save to Google Sheet
        await fetch(SHEET_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [userData] }),
        });

        // Save locally too
        localStorage.setItem("armyUser", JSON.stringify(userData));

        alert("Details saved successfully!");
        closeLoginModal();
        window.location.href = "profile.html";
      } catch (err) {
        console.error("Error saving to sheet:", err);
        alert("Something went wrong!");
      }
    });
  }

  // ---------- Show profile ----------
  const profileInfo = document.getElementById("profileInfo");
  if (profileInfo) {
    const user = JSON.parse(localStorage.getItem("armyUser"));
    if (user) {
      profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>State:</strong> ${user.state}</p>
        <p><strong>City:</strong> ${user.city}</p>
        <p><strong>Address:</strong> ${user.address}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Father Name:</strong> ${user.fatherName}</p>
        <p><strong>Army Connection:</strong> ${user.armyConnection}</p>
        <p><strong>Education:</strong> ${user.education}</p>
        <p><strong>Occupation:</strong> ${user.occupation}</p>
        <p><strong>Donated Amount:</strong> ₹${user.donatedAmount || 0}</p>
      `;
    } else {
      profileInfo.innerHTML = `<p class="text-red-400">You are not logged in.</p>`;
    }
  }

  // ---------- Highlight current page ----------
  const navLinks = document.querySelectorAll("nav ul li a");
  const currentPath = window.location.pathname.split("/").pop();

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("text-blue-400", "font-bold"); // highlight active
    } else {
      link.classList.remove("text-blue-400", "font-bold");
    }
  });
});




// ---------- Profile Page UI ----------
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");
const profileAddress = document.getElementById("profileAddress");
const profileAge = document.getElementById("profileAge");
const profileGender = document.getElementById("profileGender");
const profileCity = document.getElementById("profileCity");
const profileState = document.getElementById("profileState");
const profileFamily = document.getElementById("profileFamily");
const profilePassword = document.getElementById("profilePassword");

const donationBox = document.getElementById("donationBox");
const profileImage = document.getElementById("profileImage");
const uploadImage = document.getElementById("uploadImage");

const userData = JSON.parse(localStorage.getItem("armyUser"));

if (userData && profileName) {
  profileName.textContent = `${userData.firstName} ${userData.lastName}`;
  profileEmail.textContent = userData.email || "";
  profilePhone.textContent = userData.phone || "";
  profileAddress.textContent = userData.address || "";
  profileAge.textContent = userData.age || "";
  profileGender.textContent = userData.gender || "";
  profileCity.textContent = userData.city || "";
  profileState.textContent = userData.state || "";
  profileFamily.textContent = userData.familyInArmy ? "Yes" : "No";
  profilePassword.textContent = userData.password ? "********" : "";

  // Donations
  if (donationBox) {
    if (userData.donatedAmount) {
      donationBox.innerHTML = `
        <ul class="space-y-2">
          <li class="p-3 bg-gray-700 rounded-lg flex justify-between">
            <span>Initial Donation</span>
            <span class="font-semibold text-green-400">₹${userData.donatedAmount}</span>
          </li>
        </ul>
      `;
    }
  }
}

// Profile Image Upload & Save to localStorage
if (uploadImage) {
  uploadImage.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        profileImage.src = event.target.result;
        localStorage.setItem("profileImage", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Load saved image
const savedImg = localStorage.getItem("profileImage");
if (savedImg && profileImage) {
  profileImage.src = savedImg;
}
