// Define insurance plans data at the top of the file, outside any function
const insurancePlans = {
  "hdfc-life": {
    name: "HDFC Life Click 2 Protect",
    type: "Term Life",
    provider: "HDFC Life",
    coverage: "₹1 Cr - ₹10 Cr",
    premium: "Starting from ₹750/month",
    claimSettlement: "98.7%",
    keyBenefits: [
      "Multiple death benefit payout options",
      "Tax benefits under Section 80C and 10(10D)",
      "Optional riders for additional protection",
    ],
    exclusions: [
      "Suicide within 12 months",
      "Death due to pre-existing conditions not disclosed",
      "Death due to hazardous activities",
    ],
    waitingPeriod: "None",
  },
  "max-bupa": {
    name: "Max Bupa Health Companion",
    type: "Health Insurance",
    provider: "Max Bupa",
    coverage: "₹5 Lakhs - ₹1 Cr",
    premium: "Starting from ₹1,200/month",
    claimSettlement: "96.5%",
    keyBenefits: [
      "Cashless treatment at 4500+ hospitals",
      "No claim bonus up to 150%",
      "Annual health check-ups",
    ],
    exclusions: [
      "Pre-existing diseases (2 year waiting)",
      "Cosmetic treatments",
      "Self-inflicted injuries",
    ],
    waitingPeriod: "30 days for general claims",
  },
  "icici-lombard": {
    name: "ICICI Lombard Complete Health Insurance",
    type: "Health Insurance",
    provider: "ICICI Lombard",
    coverage: "₹3 Lakhs - ₹50 Lakhs",
    premium: "Starting from ₹1,000/month",
    claimSettlement: "95.8%",
    keyBenefits: [
      "Cashless treatment at 6500+ hospitals",
      "No claim bonus protection",
      "Health check-up every 2 years",
      "Alternative treatment coverage",
    ],
    exclusions: [
      "Pre-existing diseases (3 year waiting)",
      "Cosmetic treatments",
      "Experimental treatments",
    ],
    waitingPeriod: "30 days for general claims",
  },
  "bajaj-allianz": {
    name: "Bajaj Allianz Drive Assure",
    type: "Auto Insurance",
    provider: "Bajaj Allianz",
    coverage: "Comprehensive",
    premium: "Starting from ₹2,000/year",
    claimSettlement: "94.6%",
    keyBenefits: [
      "No Claim Bonus up to 50%",
      "24/7 Roadside Assistance",
      "10+ Add-on Covers available",
    ],
    exclusions: [
      "Driving without valid license",
      "Driving under influence",
      "Normal wear and tear",
    ],
    waitingPeriod: "None",
  },
  "tata-aig": {
    name: "Tata AIG Travel Guard",
    type: "Travel Insurance",
    provider: "Tata AIG",
    coverage: "Worldwide",
    premium: "Starting from ₹233/day",
    claimSettlement: "93.5%",
    keyBenefits: [
      "Medical coverage up to $500,000",
      "Trip cancellation up to $10,000",
      "24/7 global assistance",
    ],
    exclusions: [
      "Pre-existing conditions",
      "Travel against medical advice",
      "Participation in illegal activities",
    ],
    waitingPeriod: "None",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  // Initialize view-all buttons
  const viewAllButtons = document.querySelectorAll(".view-all-btn");

  viewAllButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const portfolioSection = this.closest(".portfolio-section");
      const sectionTitle = portfolioSection
        .querySelector("h3")
        .textContent.trim();

      // Create a modal for viewing all portfolio items
      const modal = document.createElement("div");
      modal.classList.add("portfolio-modal");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "1200px";
      modalContent.style.maxHeight = "85vh";
      modalContent.style.overflowY = "auto";
      modalContent.style.padding = "2rem";

      const modalHeader = document.createElement("div");
      modalHeader.style.display = "flex";
      modalHeader.style.justifyContent = "space-between";
      modalHeader.style.alignItems = "center";
      modalHeader.style.marginBottom = "1.5rem";

      const modalTitle = document.createElement("h2");
      modalTitle.textContent = sectionTitle;
      modalTitle.style.margin = "0";

      const closeButton = document.createElement("button");
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "1.5rem";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#718096";

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      // Clone the table content
      const tableClone = portfolioSection
        .querySelector(".portfolio-table")
        .cloneNode(true);

      // Add some additional functionalities
      const additionalControls = document.createElement("div");
      additionalControls.style.display = "flex";
      additionalControls.style.justifyContent = "space-between";
      additionalControls.style.marginBottom = "1rem";

      const filterContainer = document.createElement("div");
      filterContainer.innerHTML = `
                <label style="margin-right: 0.5rem; font-weight: 500;">Filter by:</label>
                <select style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                    <option value="all">All Items</option>
                    <option value="recent">Recently Purchased</option>
                    <option value="high-value">Highest Value</option>
                    <option value="maturity">Upcoming Maturity</option>
                </select>
            `;

      const searchContainer = document.createElement("div");
      searchContainer.innerHTML = `
                <input type="text" placeholder="Search your portfolio..." style="padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px; width: 250px;">
                <button style="padding: 0.5rem 1rem; background-color: #4299e1; color: white; border: none; border-radius: 4px; margin-left: 0.5rem; cursor: pointer;">
                    <i class="fas fa-search"></i> Search
                </button>
            `;

      additionalControls.appendChild(filterContainer);
      additionalControls.appendChild(searchContainer);

      // Add Download/Export options
      const exportOptions = document.createElement("div");
      exportOptions.style.display = "flex";
      exportOptions.style.justifyContent = "flex-end";
      exportOptions.style.marginTop = "1.5rem";
      exportOptions.style.gap = "0.8rem";

      const downloadPDF = document.createElement("button");
      downloadPDF.innerHTML = '<i class="fas fa-file-pdf"></i> Export as PDF';
      downloadPDF.style.padding = "0.5rem 1rem";
      downloadPDF.style.backgroundColor = "#e53e3e";
      downloadPDF.style.color = "white";
      downloadPDF.style.border = "none";
      downloadPDF.style.borderRadius = "4px";
      downloadPDF.style.cursor = "pointer";

      const printButton = document.createElement("button");
      printButton.innerHTML = '<i class="fas fa-print"></i> Print';
      printButton.style.padding = "0.5rem 1rem";
      printButton.style.backgroundColor = "#4a5568";
      printButton.style.color = "white";
      printButton.style.border = "none";
      printButton.style.borderRadius = "4px";
      printButton.style.cursor = "pointer";

      exportOptions.appendChild(downloadPDF);
      exportOptions.appendChild(printButton);

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(additionalControls);
      modalContent.appendChild(tableClone);
      modalContent.appendChild(exportOptions);
      modal.appendChild(modalContent);

      document.body.appendChild(modal);

      // Close modal functionality
      closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      // Close when clicking outside modal
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      // Export as PDF functionality
      downloadPDF.addEventListener("click", function () {
        alert("Exporting portfolio to PDF...");
        // In a real implementation, this would use a library like jsPDF
      });

      // Print functionality
      printButton.addEventListener("click", function () {
        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
                    <html>
                    <head>
                        <title>${sectionTitle} - Print</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            h1 { color: #2b6cb0; }
                            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            th, td { padding: 10px; border: 1px solid #e2e8f0; text-align: left; }
                            th { background-color: #f7fafc; font-weight: bold; }
                            .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                            .date { text-align: right; }
                            @media print {
                                .no-print { display: none; }
                                button { display: none; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="print-header">
                            <h1>${sectionTitle}</h1>
                            <div class="date">Date: ${new Date().toLocaleDateString()}</div>
                        </div>
                        ${tableClone.outerHTML}
                        <div class="no-print" style="text-align: center; margin-top: 20px;">
                            <button onclick="window.print();" style="padding: 10px 20px; background-color: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer;">Print</button>
                            <button onclick="window.close();" style="padding: 10px 20px; background-color: #718096; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Close</button>
                        </div>
                    </body>
                    </html>
                `);

        printWindow.document.close();
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add hover effects for option cards
  const optionCards = document.querySelectorAll(".option-card");
  optionCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });

  // Add click event for explore buttons
  const exploreButtons = document.querySelectorAll(".explore-btn");
  exploreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const cardTitle = this.parentElement.querySelector("h3").textContent;
      alert(
        `You clicked to explore ${cardTitle}. This feature is coming soon!`
      );
    });
  });

  // Add click event for action buttons
  const actionButtons = document.querySelectorAll(".action-btn");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      alert(`You clicked "${buttonText}". This feature is coming soon!`);
    });
  });

  // Handle bond card buttons
  const viewDetailsButtons = document.querySelectorAll(".view-details");
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bondCard = this.closest(".bond-card");
      const bondName = bondCard.querySelector(".bond-header").textContent;

      // Check if this is an insurance plan details button
      if (bondCard.closest("#insurance-section")) {
        // Get the insurance provider name to determine which modal to open
        const providerText = bondCard.querySelector(
          ".bond-segment span:nth-child(2)"
        ).textContent;
        const provider = providerText
          .split(":")[1]
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-");

        // Map provider to modal ID
        let modalId = "";
        if (provider === "hdfc-life") modalId = "hdfc-life-modal";
        else if (provider === "max-bupa") modalId = "max-bupa-modal";
        else if (provider === "icici-lombard") modalId = "icici-lombard-modal";
        else if (provider === "sbi-life") modalId = "sbi-life-modal";
        else if (provider === "bajaj-allianz") modalId = "bajaj-allianz-modal";
        else if (provider === "tata-aig") modalId = "tata-aig-modal";

        if (modalId) {
          // Open the corresponding modal
          const modal = document.getElementById(modalId);
          if (modal) {
            modal.style.display = "block";

            // Add event listener to close button
            const closeBtn = modal.querySelector(".close-modal");
            closeBtn.addEventListener("click", function () {
              modal.style.display = "none";
            });

            // Close modal when clicking outside of it
            window.addEventListener("click", function (event) {
              if (event.target === modal) {
                modal.style.display = "none";
              }
            });

            // Add event listeners to modal action buttons
            const actionButtons = modal.querySelectorAll(
              ".insurance-details-actions .action-btn"
            );
            actionButtons.forEach((btn) => {
              btn.addEventListener("click", function () {
                alert(
                  `${this.textContent.trim()} feature will be available soon!`
                );
              });
            });
          }
          return;
        }
      }

      // Default behavior for non-insurance cards
      alert(`Viewing details for ${bondName}`);
    });
  });

  const buyNowButtons = document.querySelectorAll(".buy-now");
  buyNowButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bondCard = this.closest(".bond-card");
      const bondName = bondCard.querySelector(".bond-header").textContent;
      alert(
        `Proceeding to purchase ${bondName}. You will be redirected to the secure payment gateway.`
      );
    });
  });

  const compareIcons = document.querySelectorAll(".compare-icon");
  compareIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const bondCard = this.closest(".bond-card");
      const bondName = bondCard.querySelector(".bond-header").textContent;

      // Check if this bond is already in the comparison list
      let comparisonList =
        JSON.parse(localStorage.getItem("bondComparison")) || [];

      if (comparisonList.includes(bondName)) {
        alert(`${bondName} has been removed from comparison.`);
        comparisonList = comparisonList.filter((bond) => bond !== bondName);
      } else {
        if (comparisonList.length >= 4) {
          alert(
            "You can compare up to 4 bonds at a time. Please remove a bond before adding a new one."
          );
          return;
        }
        alert(`${bondName} has been added to comparison.`);
        comparisonList.push(bondName);
      }

      localStorage.setItem("bondComparison", JSON.stringify(comparisonList));
      updateComparisonUI();
    });
  });

  // More button functionality
  const moreButtons = document.querySelectorAll(".more-btn");
  moreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Additional ratings and details will be displayed here.");
    });
  });

  // Login link functionality
  const loginLinks = document.querySelectorAll(".login-link");
  loginLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      alert(
        "Please log in to view this information. Redirecting to login page..."
      );
    });
  });

  // Function to update comparison UI (placeholder)
  function updateComparisonUI() {
    const comparisonList =
      JSON.parse(localStorage.getItem("bondComparison")) || [];

    if (comparisonList.length > 0) {
      // If there's no comparison bar yet, create one
      let comparisonBar = document.getElementById("comparison-bar");
      if (!comparisonBar) {
        comparisonBar = document.createElement("div");
        comparisonBar.id = "comparison-bar";
        comparisonBar.style.position = "fixed";
        comparisonBar.style.bottom = "0";
        comparisonBar.style.left = "0";
        comparisonBar.style.width = "100%";
        comparisonBar.style.backgroundColor = "rgba(45, 55, 72, 0.95)";
        comparisonBar.style.color = "white";
        comparisonBar.style.padding = "15px";
        comparisonBar.style.display = "flex";
        comparisonBar.style.justifyContent = "space-between";
        comparisonBar.style.alignItems = "center";
        comparisonBar.style.zIndex = "1000";
        document.body.appendChild(comparisonBar);
      }

      // Update the comparison bar content
      comparisonBar.innerHTML = `
                <div>
                    <strong>Comparing ${comparisonList.length} Bond${
        comparisonList.length > 1 ? "s" : ""
      }:</strong> 
                    ${comparisonList.join(", ")}
                </div>
                <div>
                    <button id="compare-now" style="background-color: #f6ad55; color: white; border: none; padding: 8px 15px; border-radius: 4px; margin-right: 10px; cursor: pointer;">Compare Now</button>
                    <button id="clear-comparison" style="background-color: transparent; color: white; border: 1px solid white; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Clear</button>
                </div>
            `;

      // Add event listeners to the new buttons
      document
        .getElementById("compare-now")
        .addEventListener("click", function () {
          alert("Comparing bonds: " + comparisonList.join(", "));
        });

      document
        .getElementById("clear-comparison")
        .addEventListener("click", function () {
          localStorage.removeItem("bondComparison");
          document.body.removeChild(comparisonBar);
        });
    } else {
      // If there's no bonds to compare, remove the comparison bar
      const comparisonBar = document.getElementById("comparison-bar");
      if (comparisonBar) {
        document.body.removeChild(comparisonBar);
      }
    }
  }

  // Initialize comparison UI on page load
  updateComparisonUI();

  // Add animation for section headers on scroll
  const sectionHeaders = document.querySelectorAll(".section-header");

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Add animation when sections come into view
  function handleScrollAnimation() {
    sectionHeaders.forEach((header) => {
      if (isInViewport(header) && !header.classList.contains("animated")) {
        header.style.opacity = "0";
        header.style.transition =
          "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
        header.style.transform = "translateY(20px)";

        setTimeout(() => {
          header.style.opacity = "1";
          header.style.transform = "translateY(0)";
          header.classList.add("animated");
        }, 100);
      }
    });
  }

  // Initial check on page load
  handleScrollAnimation();

  // Check on scroll
  window.addEventListener("scroll", handleScrollAnimation);

  // Add tooltip functionality for social media icons
  const socialLinks = document.querySelectorAll(".social-links a");
  socialLinks.forEach((link) => {
    const icon = link.querySelector("i");
    const iconClass = icon.className;

    let platform = "";
    if (iconClass.includes("facebook")) platform = "Facebook";
    if (iconClass.includes("twitter")) platform = "Twitter";
    if (iconClass.includes("linkedin")) platform = "LinkedIn";
    if (iconClass.includes("instagram")) platform = "Instagram";

    link.setAttribute("title", `Follow us on ${platform}`);
  });

  // Add current year to footer copyright
  const footerYear = document.querySelector(".footer-bottom p");
  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace("2023", currentYear);

  // Investment portal login/signup functionality (placeholder)
  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.style.backgroundColor = "#4299e1";
  loginButton.style.color = "white";
  loginButton.style.border = "none";
  loginButton.style.padding = "0.5rem 1.5rem";
  loginButton.style.borderRadius = "4px";
  loginButton.style.fontWeight = "bold";
  loginButton.style.cursor = "pointer";
  loginButton.style.marginLeft = "1rem";

  const nav = document.querySelector("nav ul");
  nav.appendChild(document.createElement("li")).appendChild(loginButton);

  loginButton.addEventListener("click", function () {
    alert("Login/Signup functionality coming soon!");
  });

  // Insurance card functionality
  const insuranceCompareIcons = document.querySelectorAll(
    "#insurance-section .compare-icon"
  );
  insuranceCompareIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const insuranceCard = this.closest(".bond-card");
      const insuranceName =
        insuranceCard.querySelector(".bond-header").textContent;

      // Check if this insurance plan is already in the comparison list
      let insuranceComparisonList =
        JSON.parse(localStorage.getItem("insuranceComparison")) || [];

      if (insuranceComparisonList.includes(insuranceName)) {
        alert(`${insuranceName} has been removed from comparison.`);
        insuranceComparisonList = insuranceComparisonList.filter(
          (plan) => plan !== insuranceName
        );
      } else {
        if (insuranceComparisonList.length >= 3) {
          alert(
            "You can compare up to 3 insurance plans at a time. Please remove a plan before adding a new one."
          );
          return;
        }
        alert(`${insuranceName} has been added to comparison.`);
        insuranceComparisonList.push(insuranceName);
      }

      localStorage.setItem(
        "insuranceComparison",
        JSON.stringify(insuranceComparisonList)
      );
      updateInsuranceComparisonUI();
    });
  });

  // Insurance plan details buttons
  const insuranceDetailsButtons = document.querySelectorAll(
    "#insurance-section .view-details"
  );
  insuranceDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const insuranceCard = this.closest(".bond-card");
      const insuranceName =
        insuranceCard.querySelector(".bond-header").textContent;
      const insuranceCategory = insuranceCard
        .querySelector(".bond-segment span:first-child")
        .textContent.split(":")[1]
        .trim();

      alert(
        `Viewing details for ${insuranceName} (${insuranceCategory}). Full coverage details and policy documents will be displayed here.`
      );
    });
  });

  // Insurance quote buttons
  const insuranceQuoteButtons = document.querySelectorAll(
    "#insurance-section .buy-now"
  );
  insuranceQuoteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const insuranceCard = this.closest(".bond-card");
      const insuranceName =
        insuranceCard.querySelector(".bond-header").textContent;

      // Create a simple modal for quote request
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.padding = "2rem";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "500px";
      modalContent.style.maxHeight = "80vh";
      modalContent.style.overflowY = "auto";

      modalContent.innerHTML = `
                <h2 style="margin-bottom: 1.5rem; color: var(--insurance-color);">${insuranceName} - Get Quote</h2>
                <form id="insurance-quote-form">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Full Name</label>
                        <input type="text" placeholder="Enter your full name" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Address</label>
                        <input type="email" placeholder="Enter your email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Preferred Contact Time</label>
                        <select style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
                            <option>Morning (9 AM - 12 PM)</option>
                            <option>Afternoon (12 PM - 5 PM)</option>
                            <option>Evening (5 PM - 8 PM)</option>
                        </select>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <button type="button" id="close-modal" style="padding: 0.8rem 1.5rem; background-color: transparent; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Cancel</button>
                        <button type="button" id="submit-quote" style="padding: 0.8rem 1.5rem; background-color: var(--insurance-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Request Quote</button>
                    </div>
                </form>
            `;

      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      document
        .getElementById("close-modal")
        .addEventListener("click", function () {
          document.body.removeChild(modal);
        });

      document
        .getElementById("submit-quote")
        .addEventListener("click", function () {
          alert(
            "Your quote request has been submitted. A representative will contact you shortly."
          );
          document.body.removeChild(modal);
        });
    });
  });

  // Function to update insurance comparison UI
  function updateInsuranceComparisonUI() {
    const insuranceComparisonList =
      JSON.parse(localStorage.getItem("insuranceComparison")) || [];

    if (insuranceComparisonList.length > 0) {
      // If there's no comparison bar yet, create one
      let insuranceComparisonBar = document.getElementById(
        "insurance-comparison-bar"
      );
      if (!insuranceComparisonBar) {
        insuranceComparisonBar = document.createElement("div");
        insuranceComparisonBar.id = "insurance-comparison-bar";
        insuranceComparisonBar.style.position = "fixed";
        insuranceComparisonBar.style.bottom = document.getElementById(
          "comparison-bar"
        )
          ? "60px"
          : "0";
        insuranceComparisonBar.style.left = "0";
        insuranceComparisonBar.style.width = "100%";
        insuranceComparisonBar.style.backgroundColor =
          "rgba(214, 158, 46, 0.95)";
        insuranceComparisonBar.style.color = "white";
        insuranceComparisonBar.style.padding = "15px";
        insuranceComparisonBar.style.display = "flex";
        insuranceComparisonBar.style.justifyContent = "space-between";
        insuranceComparisonBar.style.alignItems = "center";
        insuranceComparisonBar.style.zIndex = "1000";
        document.body.appendChild(insuranceComparisonBar);
      }

      // Update the insurance comparison bar content
      insuranceComparisonBar.innerHTML = `
                <div>
                    <strong>Comparing ${
                      insuranceComparisonList.length
                    } Insurance Plan${
        insuranceComparisonList.length > 1 ? "s" : ""
      }:</strong> 
                    ${insuranceComparisonList.join(", ")}
                </div>
                <div>
                    <button id="compare-insurance-now" style="background-color: white; color: var(--insurance-color); border: none; padding: 8px 15px; border-radius: 4px; margin-right: 10px; cursor: pointer; font-weight: bold;">Compare Plans</button>
                    <button id="clear-insurance-comparison" style="background-color: transparent; color: white; border: 1px solid white; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Clear</button>
                </div>
            `;

      // Add event listeners to the new buttons
      document
        .getElementById("compare-insurance-now")
        .addEventListener("click", function () {
          alert(
            "Comparing insurance plans: " + insuranceComparisonList.join(", ")
          );
        });

      document
        .getElementById("clear-insurance-comparison")
        .addEventListener("click", function () {
          localStorage.removeItem("insuranceComparison");
          document.body.removeChild(insuranceComparisonBar);
        });
    } else {
      // If there's no insurance plans to compare, remove the comparison bar
      const insuranceComparisonBar = document.getElementById(
        "insurance-comparison-bar"
      );
      if (insuranceComparisonBar) {
        document.body.removeChild(insuranceComparisonBar);
      }
    }
  }

  // Initialize insurance comparison UI on page load
  updateInsuranceComparisonUI();

  // Mutual Funds functionality
  const mutualFundCompareIcons = document.querySelectorAll(
    "#mutual-funds-section .compare-icon"
  );
  mutualFundCompareIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const fundCard = this.closest(".bond-card");
      const fundName = fundCard.querySelector(".bond-header").textContent;

      // Check if this fund is already in the comparison list
      let fundComparisonList =
        JSON.parse(localStorage.getItem("fundComparison")) || [];

      if (fundComparisonList.includes(fundName)) {
        alert(`${fundName} has been removed from comparison.`);
        fundComparisonList = fundComparisonList.filter(
          (fund) => fund !== fundName
        );
      } else {
        if (fundComparisonList.length >= 4) {
          alert(
            "You can compare up to 4 mutual funds at a time. Please remove a fund before adding a new one."
          );
          return;
        }
        alert(`${fundName} has been added to comparison.`);
        fundComparisonList.push(fundName);
      }

      localStorage.setItem(
        "fundComparison",
        JSON.stringify(fundComparisonList)
      );
      updateFundComparisonUI();
    });
  });

  // Mutual fund details buttons
  const fundDetailsButtons = document.querySelectorAll(
    "#mutual-funds-section .view-details"
  );
  fundDetailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fundCard = this.closest(".bond-card");
      const fundName = fundCard.querySelector(".bond-header").textContent;
      const fundCategory = fundCard
        .querySelector(".bond-segment span:first-child")
        .textContent.split(":")[1]
        .trim();
      const fundNav = fundCard.querySelector(
        ".detail-item:nth-child(1) .detail-value"
      ).textContent;
      const fundReturns = fundCard.querySelector(
        ".detail-item:nth-child(5) .detail-value"
      ).textContent;

      // Create detailed modal for fund details
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "800px";
      modalContent.style.maxHeight = "85vh";
      modalContent.style.overflowY = "auto";
      modalContent.style.padding = "2rem";

      const modalHeader = document.createElement("div");
      modalHeader.style.display = "flex";
      modalHeader.style.justifyContent = "space-between";
      modalHeader.style.alignItems = "flex-start";
      modalHeader.style.marginBottom = "1.5rem";
      modalHeader.style.borderBottom = "1px solid #e2e8f0";
      modalHeader.style.paddingBottom = "1rem";

      const headerContent = document.createElement("div");

      const modalTitle = document.createElement("h2");
      modalTitle.textContent = fundName;
      modalTitle.style.margin = "0 0 0.5rem 0";
      modalTitle.style.color = "#6b46c1";

      const modalSubtitle = document.createElement("p");
      modalSubtitle.textContent = `${fundCategory} | NAV: ${fundNav} | 1Y Return: ${fundReturns}`;
      modalSubtitle.style.margin = "0";
      modalSubtitle.style.color = "#718096";

      headerContent.appendChild(modalTitle);
      headerContent.appendChild(modalSubtitle);

      const closeButton = document.createElement("button");
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "1.5rem";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#718096";

      modalHeader.appendChild(headerContent);
      modalHeader.appendChild(closeButton);

      // Create tabs for different fund information
      const tabContainer = document.createElement("div");
      tabContainer.style.marginBottom = "1.5rem";

      const tabs = [
        { id: "overview", label: "Overview", icon: "fas fa-info-circle" },
        { id: "performance", label: "Performance", icon: "fas fa-chart-line" },
        { id: "portfolio", label: "Portfolio", icon: "fas fa-briefcase" },
        { id: "risk", label: "Risk & Rating", icon: "fas fa-shield-alt" },
        { id: "documents", label: "Documents", icon: "fas fa-file-alt" },
      ];

      tabs.forEach((tab, index) => {
        const tabButton = document.createElement("button");
        tabButton.innerHTML = `<i class="${tab.icon}"></i> ${tab.label}`;
        tabButton.style.padding = "0.8rem 1.2rem";
        tabButton.style.margin = "0 0.5rem 0 0";
        tabButton.style.border = "none";
        tabButton.style.borderBottom =
          index === 0 ? "3px solid #6b46c1" : "3px solid transparent";
        tabButton.style.background = "none";
        tabButton.style.cursor = "pointer";
        tabButton.style.fontWeight = index === 0 ? "bold" : "normal";
        tabButton.style.color = index === 0 ? "#6b46c1" : "#4a5568";
        tabButton.dataset.tab = tab.id;

        tabContainer.appendChild(tabButton);
      });

      // Create tab content
      const tabContentContainer = document.createElement("div");
      tabContentContainer.style.padding = "1rem";

      // Only create content for first tab (Overview) for demo
      const overviewContent = document.createElement("div");
      overviewContent.dataset.tabContent = "overview";

      overviewContent.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                    <div>
                        <h3 style="margin-top: 0; color: #4a5568;">Fund Information</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">Fund Manager</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Prashant Jain</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">Fund House</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">ICICI Prudential</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">Inception Date</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">12 May 2008</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">Benchmark</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Nifty 100 TRI</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">Min. SIP Amount</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">₹1,000/month</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <h3 style="margin-top: 0; color: #4a5568;">Fund Returns</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Period</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Fund</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Category Avg</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Benchmark</th>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">1 Month</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #48bb78;">+2.34%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+1.89%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+2.12%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">6 Months</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #48bb78;">+8.76%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+7.45%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+7.98%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">1 Year</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #48bb78;">+17.28%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+15.67%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+16.45%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">3 Years</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #48bb78;">+15.93%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+14.28%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+14.56%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; color: #718096;">5 Years</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500; color: #48bb78;">+12.84%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+11.32%</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">+11.87%</td>
                            </tr>
                        </table>
                    </div>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #4a5568;">Fund Description</h3>
                    <p>This large-cap oriented fund invests in companies that form part of the top 100 by market capitalization. The fund follows a growth-oriented investment style and focuses on companies with strong fundamentals, good management, and potential for above-average growth.</p>
                    <p>The investment strategy focuses on identifying quality businesses at reasonable valuations that can deliver sustainable earnings growth over the long term.</p>
                </div>
                
                <div style="display: flex; justify-content: space-between;">
                    <div style="width: 48%;">
                        <h3 style="color: #4a5568;">Top 5 Holdings</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Company</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Sector</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">% of Assets</th>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">HDFC Bank</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">Financial Services</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">9.87%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Reliance Industries</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">Oil & Gas</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">8.52%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">ICICI Bank</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">Financial Services</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">7.94%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Infosys</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">IT</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">6.78%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">TCS</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">IT</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">5.32%</td>
                            </tr>
                        </table>
                    </div>
                    <div style="width: 48%;">
                        <h3 style="color: #4a5568;">Sector Allocation</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">Sector</th>
                                <th style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; text-align: left;">% of Assets</th>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Financial Services</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">32.45%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">IT</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">14.67%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Oil & Gas</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">12.78%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Consumer Goods</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">10.34%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Automobile</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">8.92%</td>
                            </tr>
                            <tr>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0; font-weight: 500;">Others</td>
                                <td style="padding: 0.5rem; border-bottom: 1px solid #e2e8f0;">20.84%</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;

      tabContentContainer.appendChild(overviewContent);

      // Create action buttons
      const actionButtons = document.createElement("div");
      actionButtons.style.marginTop = "2rem";
      actionButtons.style.display = "flex";
      actionButtons.style.justifyContent = "space-between";
      actionButtons.style.borderTop = "1px solid #e2e8f0";
      actionButtons.style.paddingTop = "1.5rem";

      actionButtons.innerHTML = `
                <button style="padding: 0.8rem 1.2rem; background-color: white; border: 1px solid #6b46c1; color: #6b46c1; border-radius: 4px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-calculator"></i> SIP Calculator
                </button>
                <button style="padding: 0.8rem 1.2rem; background-color: white; border: 1px solid #6b46c1; color: #6b46c1; border-radius: 4px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-chart-bar"></i> Compare
                </button>
                <button style="padding: 0.8rem 2rem; background-color: #6b46c1; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">
                    <i class="fas fa-wallet"></i> Invest Now
                </button>
            `;

      // Assemble all components
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(tabContainer);
      modalContent.appendChild(tabContentContainer);
      modalContent.appendChild(actionButtons);
      modal.appendChild(modalContent);

      document.body.appendChild(modal);

      // Close modal functionality
      closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      // Close when clicking outside modal
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      // Tab switching functionality (placeholder)
      tabContainer.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", function () {
          tabContainer.querySelectorAll("button").forEach((b) => {
            b.style.fontWeight = "normal";
            b.style.borderBottom = "3px solid transparent";
            b.style.color = "#4a5568";
          });
          this.style.fontWeight = "bold";
          this.style.borderBottom = "3px solid #6b46c1";
          this.style.color = "#6b46c1";

          alert(
            `The ${this.dataset.tab} tab content would be displayed here in a full implementation.`
          );
        });
      });

      // Action button functionality (placeholder)
      actionButtons.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", function () {
          const btnText = this.textContent.trim();
          if (btnText.includes("SIP Calculator")) {
            alert("SIP Calculator will be opened here.");
          } else if (btnText.includes("Compare")) {
            // Add to comparison
            let fundComparisonList =
              JSON.parse(localStorage.getItem("fundComparison")) || [];
            if (!fundComparisonList.includes(fundName)) {
              if (fundComparisonList.length >= 4) {
                alert(
                  "You can compare up to 4 mutual funds at a time. Please remove a fund before adding a new one."
                );
              } else {
                fundComparisonList.push(fundName);
                localStorage.setItem(
                  "fundComparison",
                  JSON.stringify(fundComparisonList)
                );
                updateFundComparisonUI();
                alert(`${fundName} has been added to comparison.`);
              }
            } else {
              alert(`${fundName} is already in your comparison list.`);
            }
          } else if (btnText.includes("Invest Now")) {
            alert(
              `You are about to invest in ${fundName}. Redirecting to the investment portal...`
            );
          }
        });
      });
    });
  });

  // Mutual fund invest buttons
  const investButtons = document.querySelectorAll(
    "#mutual-funds-section .buy-now"
  );
  investButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fundCard = this.closest(".bond-card");
      const fundName = fundCard.querySelector(".bond-header").textContent;

      // Create investment modal
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.padding = "2rem";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "500px";
      modalContent.style.maxHeight = "80vh";
      modalContent.style.overflowY = "auto";

      modalContent.innerHTML = `
                <h2 style="margin-bottom: 1.5rem; color: #6b46c1;">Invest in ${fundName}</h2>
                <form id="fund-investment-form">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; margin-bottom: 1rem;">
                            <div style="flex: 1; padding-right: 0.5rem;">
                                <input type="radio" id="lumpsum" name="investment-type" checked>
                                <label for="lumpsum" style="font-weight: 500; margin-left: 0.3rem;">Lumpsum</label>
                            </div>
                            <div style="flex: 1; padding-left: 0.5rem;">
                                <input type="radio" id="sip" name="investment-type">
                                <label for="sip" style="font-weight: 500; margin-left: 0.3rem;">SIP</label>
                            </div>
                        </div>
                        
                        <div id="lumpsum-fields">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Investment Amount</label>
                                <input type="text" placeholder="Enter amount (₹)" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                        </div>
                        
                        <div id="sip-fields" style="display: none;">
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Monthly SIP Amount</label>
                                <input type="text" placeholder="Enter amount (₹)" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">SIP Date</label>
                                <select style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                                    <option>1st of every month</option>
                                    <option>5th of every month</option>
                                    <option>10th of every month</option>
                                    <option>15th of every month</option>
                                    <option>20th of every month</option>
                                    <option>25th of every month</option>
                                </select>
                            </div>
                            <div style="margin-bottom: 1rem;">
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">SIP Period</label>
                                <select style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                                    <option>Until Cancelled</option>
                                    <option>1 Year</option>
                                    <option>3 Years</option>
                                    <option>5 Years</option>
                                    <option>10 Years</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Investment Account</label>
                        <select style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                            <option>Primary Investment Account</option>
                            <option>Secondary Investment Account</option>
                            <option>+ Add New Account</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <div style="display: flex; align-items: center;">
                            <input type="checkbox" id="terms" checked>
                            <label for="terms" style="margin-left: 0.5rem;">I have read and agree to the <a href="#" style="color: #6b46c1;">fund scheme document</a> and <a href="#" style="color: #6b46c1;">terms & conditions</a>.</label>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between;">
                        <button type="button" id="close-investment-modal" style="padding: 0.8rem 1.5rem; background-color: transparent; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Cancel</button>
                        <button type="button" id="submit-investment" style="padding: 0.8rem 1.5rem; background-color: #6b46c1; color: white; border: none; border-radius: 4px; cursor: pointer;">Proceed to Payment</button>
                    </div>
                </form>
            `;

      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Investment type toggle functionality
      const lumpsumRadio = document.getElementById("lumpsum");
      const sipRadio = document.getElementById("sip");
      const lumpsumFields = document.getElementById("lumpsum-fields");
      const sipFields = document.getElementById("sip-fields");

      lumpsumRadio.addEventListener("change", function () {
        if (this.checked) {
          lumpsumFields.style.display = "block";
          sipFields.style.display = "none";
        }
      });

      sipRadio.addEventListener("change", function () {
        if (this.checked) {
          lumpsumFields.style.display = "none";
          sipFields.style.display = "block";
        }
      });

      document
        .getElementById("close-investment-modal")
        .addEventListener("click", function () {
          document.body.removeChild(modal);
        });

      document
        .getElementById("submit-investment")
        .addEventListener("click", function () {
          alert(
            `Your investment request for ${fundName} has been submitted. You will be redirected to the payment gateway.`
          );
          document.body.removeChild(modal);
        });

      // Close when clicking outside modal
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });
    });
  });

  // Function to update mutual fund comparison UI
  function updateFundComparisonUI() {
    const fundComparisonList =
      JSON.parse(localStorage.getItem("fundComparison")) || [];

    if (fundComparisonList.length > 0) {
      // If there's no comparison bar yet, create one
      let fundComparisonBar = document.getElementById("fund-comparison-bar");
      if (!fundComparisonBar) {
        fundComparisonBar = document.createElement("div");
        fundComparisonBar.id = "fund-comparison-bar";
        fundComparisonBar.style.position = "fixed";
        fundComparisonBar.style.bottom = document.getElementById(
          "insurance-comparison-bar"
        )
          ? "120px"
          : document.getElementById("comparison-bar")
          ? "60px"
          : "0";
        fundComparisonBar.style.left = "0";
        fundComparisonBar.style.width = "100%";
        fundComparisonBar.style.backgroundColor = "rgba(107, 70, 193, 0.95)";
        fundComparisonBar.style.color = "white";
        fundComparisonBar.style.padding = "15px";
        fundComparisonBar.style.display = "flex";
        fundComparisonBar.style.justifyContent = "space-between";
        fundComparisonBar.style.alignItems = "center";
        fundComparisonBar.style.zIndex = "1000";
        document.body.appendChild(fundComparisonBar);
      }

      // Update the fund comparison bar content
      fundComparisonBar.innerHTML = `
                <div>
                    <strong>Comparing ${fundComparisonList.length} Fund${
        fundComparisonList.length > 1 ? "s" : ""
      }:</strong> 
                    ${fundComparisonList.join(", ")}
                </div>
                <div>
                    <button id="compare-funds-now" style="background-color: white; color: #6b46c1; border: none; padding: 8px 15px; border-radius: 4px; margin-right: 10px; cursor: pointer; font-weight: bold;">Compare Funds</button>
                    <button id="clear-fund-comparison" style="background-color: transparent; color: white; border: 1px solid white; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Clear</button>
                </div>
            `;

      // Add event listeners to the new buttons
      document
        .getElementById("compare-funds-now")
        .addEventListener("click", function () {
          alert("Comparing funds: " + fundComparisonList.join(", "));
        });

      document
        .getElementById("clear-fund-comparison")
        .addEventListener("click", function () {
          localStorage.removeItem("fundComparison");
          document.body.removeChild(fundComparisonBar);
        });
    } else {
      // If there's no funds to compare, remove the comparison bar
      const fundComparisonBar = document.getElementById("fund-comparison-bar");
      if (fundComparisonBar) {
        document.body.removeChild(fundComparisonBar);
      }
    }
  }

  // Initialize mutual fund comparison UI on page load
  updateFundComparisonUI();

  // Bond Calculator functionality
  const bondCalculatorBtn = document.querySelector(
    "#bonds-section .action-btn:nth-child(2)"
  );
  if (bondCalculatorBtn) {
    bondCalculatorBtn.addEventListener("click", function () {
      // Create the bond calculator modal
      const modal = document.createElement("div");
      modal.classList.add("calculator-modal");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      // Create modal content
      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "900px";
      modalContent.style.maxHeight = "85vh";
      modalContent.style.overflowY = "auto";
      modalContent.style.padding = "2rem";

      // Modal header
      const modalHeader = document.createElement("div");
      modalHeader.style.display = "flex";
      modalHeader.style.justifyContent = "space-between";
      modalHeader.style.alignItems = "center";
      modalHeader.style.marginBottom = "1.5rem";
      modalHeader.style.borderBottom = "1px solid #e2e8f0";
      modalHeader.style.paddingBottom = "1rem";

      const modalTitle = document.createElement("h2");
      modalTitle.textContent = "Bond Calculator";
      modalTitle.style.margin = "0";
      modalTitle.style.color = "#2b6cb0";

      const closeButton = document.createElement("button");
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "1.5rem";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#718096";

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      // Create calculator tabs
      const tabContainer = document.createElement("div");
      tabContainer.style.marginBottom = "1.5rem";

      const tabs = [
        { id: "price", label: "Bond Price", icon: "fas fa-money-bill-wave" },
        { id: "yield", label: "Yield Calculator", icon: "fas fa-percentage" },
        { id: "duration", label: "Duration & Risk", icon: "fas fa-chart-line" },
        {
          id: "compare",
          label: "Bond Comparison",
          icon: "fas fa-balance-scale",
        },
      ];

      tabs.forEach((tab, index) => {
        const tabButton = document.createElement("button");
        tabButton.innerHTML = `<i class="${tab.icon}"></i> ${tab.label}`;
        tabButton.style.padding = "0.8rem 1.2rem";
        tabButton.style.margin = "0 0.5rem 0 0";
        tabButton.style.border = "none";
        tabButton.style.borderBottom =
          index === 0 ? "3px solid #2b6cb0" : "3px solid transparent";
        tabButton.style.background = "none";
        tabButton.style.cursor = "pointer";
        tabButton.style.fontWeight = index === 0 ? "bold" : "normal";
        tabButton.style.color = index === 0 ? "#2b6cb0" : "#4a5568";
        tabButton.dataset.tab = tab.id;

        tabContainer.appendChild(tabButton);
      });

      // Create main calculator container
      const calculatorContainer = document.createElement("div");
      calculatorContainer.style.display = "grid";
      calculatorContainer.style.gridTemplateColumns = "1fr 1fr";
      calculatorContainer.style.gap = "2rem";

      // Create input section
      const inputSection = document.createElement("div");
      inputSection.style.borderRight = "1px solid #e2e8f0";
      inputSection.style.paddingRight = "1.5rem";

      // Create the input form
      inputSection.innerHTML = `
                <h3 style="margin-top: 0; color: #4a5568;">Bond Parameters</h3>
                <form id="bond-calculator-form">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Face Value (₹)</label>
                        <input type="number" id="face-value" value="1000" min="100" step="100" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Coupon Rate (% per annum)</label>
                        <input type="number" id="coupon-rate" value="7.5" min="0" max="30" step="0.1" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Years to Maturity</label>
                        <input type="number" id="years-to-maturity" value="5" min="0.5" max="30" step="0.5" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Required Yield (% per annum)</label>
                        <input type="number" id="required-yield" value="8" min="0" max="30" step="0.1" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Coupon Payment Frequency</label>
                        <select id="payment-frequency" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                            <option value="1">Annual</option>
                            <option value="2" selected>Semi-Annual</option>
                            <option value="4">Quarterly</option>
                            <option value="12">Monthly</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Current Bond Price (₹) (optional)</label>
                        <input type="number" id="current-price" placeholder="Enter to calculate YTM" style="width: 100%; padding: 0.8rem; border: 1px solid #ccc; border-radius: 4px;">
                    </div>
                    <div style="margin-top: 1.5rem;">
                        <button type="button" id="calculate-bond" style="padding: 0.8rem 2rem; background-color: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; width: 100%;">
                            Calculate
                        </button>
                    </div>
                </form>
            `;

      // Create results section
      const resultsSection = document.createElement("div");

      resultsSection.innerHTML = `
                <h3 style="margin-top: 0; color: #4a5568;">Bond Calculation Results</h3>
                <div id="results-container">
                    <div class="result-group" style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                        <h4 style="margin-bottom: 1rem; color: #4a5568;">Price and Yield</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Bond Price</div>
                                <div id="bond-price-result" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">₹0.00</div>
                            </div>
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Bond Price (%)</div>
                                <div id="bond-price-percent" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">0.00%</div>
                            </div>
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Current Yield</div>
                                <div id="current-yield-result" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">0.00%</div>
                            </div>
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Yield to Maturity</div>
                                <div id="ytm-result" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">0.00%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="result-group" style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0;">
                        <h4 style="margin-bottom: 1rem; color: #4a5568;">Cash Flow</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Total Interest Payments</div>
                                <div id="total-interest" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">₹0.00</div>
                            </div>
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Interest + Principal</div>
                                <div id="total-return" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">₹0.00</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="result-group">
                        <h4 style="margin-bottom: 1rem; color: #4a5568;">Risk Measures</h4>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Macaulay Duration</div>
                                <div id="macaulay-duration" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">0.00 years</div>
                            </div>
                            <div class="result-item">
                                <div style="color: #718096; font-size: 0.9rem;">Modified Duration</div>
                                <div id="modified-duration" style="font-weight: 600; font-size: 1.2rem; color: #2b6cb0;">0.00 years</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="chart-container" style="margin-top: 1.5rem; height: 200px; border: 1px solid #e2e8f0; border-radius: 4px; display: flex; justify-content: center; align-items: center;">
                    <p style="color: #718096;">Bond price chart will appear after calculation</p>
                </div>
            `;

      // Assemble all components
      calculatorContainer.appendChild(inputSection);
      calculatorContainer.appendChild(resultsSection);

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(tabContainer);
      modalContent.appendChild(calculatorContainer);

      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Close modal functionality
      closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      // Close when clicking outside modal
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      // Tab switching functionality
      tabContainer.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", function () {
          tabContainer.querySelectorAll("button").forEach((b) => {
            b.style.fontWeight = "normal";
            b.style.borderBottom = "3px solid transparent";
            b.style.color = "#4a5568";
          });
          this.style.fontWeight = "bold";
          this.style.borderBottom = "3px solid #2b6cb0";
          this.style.color = "#2b6cb0";

          if (this.dataset.tab !== "price") {
            alert(
              `The ${this.dataset.tab} calculator would be displayed here in a full implementation.`
            );
          }
        });
      });

      // Calculate button functionality
      document
        .getElementById("calculate-bond")
        .addEventListener("click", calculateBond);

      // Add event listeners to automatically update results when inputs change
      document
        .getElementById("face-value")
        .addEventListener("input", calculateBond);
      document
        .getElementById("coupon-rate")
        .addEventListener("input", calculateBond);
      document
        .getElementById("years-to-maturity")
        .addEventListener("input", calculateBond);
      document
        .getElementById("required-yield")
        .addEventListener("input", calculateBond);
      document
        .getElementById("payment-frequency")
        .addEventListener("change", calculateBond);
      document
        .getElementById("current-price")
        .addEventListener("input", calculateYTM);

      // Bond calculation function
      function calculateBond() {
        // Get input values
        const faceValue = parseFloat(
          document.getElementById("face-value").value
        );
        const couponRate =
          parseFloat(document.getElementById("coupon-rate").value) / 100;
        const yearsToMaturity = parseFloat(
          document.getElementById("years-to-maturity").value
        );
        const requiredYield =
          parseFloat(document.getElementById("required-yield").value) / 100;
        const paymentsPerYear = parseInt(
          document.getElementById("payment-frequency").value
        );

        // Calculate bond metrics
        const periodicCouponRate = couponRate / paymentsPerYear;
        const periodicYield = requiredYield / paymentsPerYear;
        const totalPeriods = paymentsPerYear * yearsToMaturity;

        // Calculate bond price using the present value formula
        let bondPrice = 0;
        const couponPayment = faceValue * periodicCouponRate;

        // PV of coupon payments
        for (let i = 1; i <= totalPeriods; i++) {
          bondPrice += couponPayment / Math.pow(1 + periodicYield, i);
        }

        // PV of face value at maturity
        bondPrice += faceValue / Math.pow(1 + periodicYield, totalPeriods);

        // Calculate price as percentage of face value
        const pricePercent = (bondPrice / faceValue) * 100;

        // Calculate current yield
        const currentYield = ((couponRate * faceValue) / bondPrice) * 100;

        // Calculate total interest payments
        const totalInterest = couponPayment * totalPeriods;

        // Calculate total return (interest + principal)
        const totalReturn = totalInterest + faceValue;

        // Calculate Macaulay Duration
        let weightedTime = 0;
        let sumPresentValues = 0;

        for (let i = 1; i <= totalPeriods; i++) {
          const presentValue = couponPayment / Math.pow(1 + periodicYield, i);
          weightedTime += (i / paymentsPerYear) * presentValue;
          sumPresentValues += presentValue;
        }

        // Add the face value component
        const faceValuePV =
          faceValue / Math.pow(1 + periodicYield, totalPeriods);
        weightedTime += yearsToMaturity * faceValuePV;
        sumPresentValues += faceValuePV;

        const macaulayDuration = weightedTime / sumPresentValues;

        // Modified duration
        const modifiedDuration = macaulayDuration / (1 + periodicYield);

        // Update results
        document.getElementById(
          "bond-price-result"
        ).textContent = `₹${bondPrice.toFixed(2)}`;
        document.getElementById(
          "bond-price-percent"
        ).textContent = `${pricePercent.toFixed(2)}%`;
        document.getElementById(
          "current-yield-result"
        ).textContent = `${currentYield.toFixed(2)}%`;
        document.getElementById(
          "total-interest"
        ).textContent = `₹${totalInterest.toFixed(2)}`;
        document.getElementById(
          "total-return"
        ).textContent = `₹${totalReturn.toFixed(2)}`;
        document.getElementById(
          "macaulay-duration"
        ).textContent = `${macaulayDuration.toFixed(2)} years`;
        document.getElementById(
          "modified-duration"
        ).textContent = `${modifiedDuration.toFixed(2)} years`;

        // Update chart container
        const chartContainer = document.getElementById("chart-container");
        chartContainer.innerHTML = "";
        chartContainer.style.display = "flex";
        chartContainer.style.justifyContent = "center";
        chartContainer.style.alignItems = "center";

        // Create a simple visual representation of price vs yield
        const chartCanvas = document.createElement("div");
        chartCanvas.style.width = "90%";
        chartCanvas.style.height = "90%";
        chartCanvas.style.position = "relative";

        // Create a header for the chart
        const chartHeader = document.createElement("div");
        chartHeader.style.textAlign = "center";
        chartHeader.style.marginBottom = "1rem";
        chartHeader.innerHTML = "<strong>Price vs Yield Curve</strong>";

        chartContainer.appendChild(chartHeader);

        // Create the price curve - simple representation
        const startYield = Math.max(0, requiredYield - 0.05);
        const endYield = requiredYield + 0.05;
        const stepSize = 0.01;
        const numPoints = Math.floor((endYield - startYield) / stepSize) + 1;

        const chartData = [];
        for (let i = 0; i < numPoints; i++) {
          const yieldRate = startYield + i * stepSize;
          const periodicYieldRate = yieldRate / paymentsPerYear;

          let price = 0;
          // PV of coupon payments
          for (let j = 1; j <= totalPeriods; j++) {
            price += couponPayment / Math.pow(1 + periodicYieldRate, j);
          }
          // PV of face value
          price += faceValue / Math.pow(1 + periodicYieldRate, totalPeriods);

          chartData.push({ yield: yieldRate * 100, price });
        }

        // Find min and max for scaling
        const minPrice = Math.min(...chartData.map((d) => d.price));
        const maxPrice = Math.max(...chartData.map((d) => d.price));
        const priceRange = maxPrice - minPrice;

        // Create an SVG for the chart
        const svgContainer = document.createElement("div");
        svgContainer.style.width = "100%";
        svgContainer.style.height = "150px";

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.overflow = "visible";

        // Create X and Y axes
        const xAxis = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        xAxis.setAttribute("x1", "40");
        xAxis.setAttribute("y1", "120");
        xAxis.setAttribute("x2", "100%");
        xAxis.setAttribute("y2", "120");
        xAxis.setAttribute("stroke", "#718096");
        xAxis.setAttribute("stroke-width", "1");

        const yAxis = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        yAxis.setAttribute("x1", "40");
        yAxis.setAttribute("y1", "10");
        yAxis.setAttribute("x2", "40");
        yAxis.setAttribute("y2", "120");
        yAxis.setAttribute("stroke", "#718096");
        yAxis.setAttribute("stroke-width", "1");

        svg.appendChild(xAxis);
        svg.appendChild(yAxis);

        // Add X axis label
        const xLabel = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        xLabel.setAttribute("x", "50%");
        xLabel.setAttribute("y", "140");
        xLabel.setAttribute("text-anchor", "middle");
        xLabel.setAttribute("fill", "#718096");
        xLabel.setAttribute("font-size", "10");
        xLabel.textContent = "Yield (%)";

        // Add Y axis label
        const yLabel = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        yLabel.setAttribute("x", "10");
        yLabel.setAttribute("y", "70");
        yLabel.setAttribute("text-anchor", "middle");
        yLabel.setAttribute("fill", "#718096");
        yLabel.setAttribute("font-size", "10");
        yLabel.setAttribute("transform", "rotate(-90, 10, 70)");
        yLabel.textContent = "Price (₹)";

        svg.appendChild(xLabel);
        svg.appendChild(yLabel);

        // Create the curve path
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        let pathD = "M";

        // Calculate the current yield and price point
        const width =
          chartData.length > 1 ? (100 - 40) / (chartData.length - 1) : 0;
        const height = 110;

        chartData.forEach((point, index) => {
          const x = 40 + index * width;
          const y = 120 - ((point.price - minPrice) / priceRange) * height;

          if (index === 0) {
            pathD += `${x},${y}`;
          } else {
            pathD += ` L${x},${y}`;
          }

          // Add yield markers for the first, middle, and last points
          if (
            index === 0 ||
            index === chartData.length - 1 ||
            index === Math.floor(chartData.length / 2)
          ) {
            const tickMark = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );
            tickMark.setAttribute("x1", x);
            tickMark.setAttribute("y1", "120");
            tickMark.setAttribute("x2", x);
            tickMark.setAttribute("y2", "125");
            tickMark.setAttribute("stroke", "#718096");
            tickMark.setAttribute("stroke-width", "1");

            const tickLabel = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );
            tickLabel.setAttribute("x", x);
            tickLabel.setAttribute("y", "135");
            tickLabel.setAttribute("text-anchor", "middle");
            tickLabel.setAttribute("fill", "#718096");
            tickLabel.setAttribute("font-size", "8");
            tickLabel.textContent = point.yield.toFixed(1);

            svg.appendChild(tickMark);
            svg.appendChild(tickLabel);
          }
        });

        path.setAttribute("d", pathD);
        path.setAttribute("stroke", "#2b6cb0");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("fill", "none");

        svg.appendChild(path);

        // Highlight the current yield and price point
        const currentIndex = chartData.findIndex(
          (d) => Math.abs(d.yield - requiredYield * 100) < 0.01
        );
        if (currentIndex >= 0) {
          const point = chartData[currentIndex];
          const x = 40 + currentIndex * width;
          const y = 120 - ((point.price - minPrice) / priceRange) * height;

          const currentPoint = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          currentPoint.setAttribute("cx", x);
          currentPoint.setAttribute("cy", y);
          currentPoint.setAttribute("r", "4");
          currentPoint.setAttribute("fill", "#ed8936");

          svg.appendChild(currentPoint);
        }

        svgContainer.appendChild(svg);
        chartContainer.appendChild(svgContainer);

        // Set YTM result to match required yield for input consistency
        document.getElementById("ytm-result").textContent = `${(
          requiredYield * 100
        ).toFixed(2)}%`;
      }

      // Calculate YTM from bond price
      function calculateYTM() {
        const currentPrice = parseFloat(
          document.getElementById("current-price").value
        );
        if (isNaN(currentPrice) || currentPrice <= 0) {
          return;
        }

        const faceValue = parseFloat(
          document.getElementById("face-value").value
        );
        const couponRate =
          parseFloat(document.getElementById("coupon-rate").value) / 100;
        const yearsToMaturity = parseFloat(
          document.getElementById("years-to-maturity").value
        );
        const paymentsPerYear = parseInt(
          document.getElementById("payment-frequency").value
        );

        const periodicCouponRate = couponRate / paymentsPerYear;
        const couponPayment = faceValue * periodicCouponRate;
        const totalPeriods = paymentsPerYear * yearsToMaturity;

        // Use Newton-Raphson method to find YTM (numerical approximation)
        let guess = couponRate; // Initial guess for YTM
        let tolerance = 0.0000001;
        let maxIterations = 100;
        let iteration = 0;

        while (iteration < maxIterations) {
          let price = 0;
          let derivative = 0;

          const periodicYield = guess / paymentsPerYear;

          // Calculate price and derivative
          for (let i = 1; i <= totalPeriods; i++) {
            price += couponPayment / Math.pow(1 + periodicYield, i);
            derivative -=
              (i * couponPayment) / Math.pow(1 + periodicYield, i + 1);
          }

          price += faceValue / Math.pow(1 + periodicYield, totalPeriods);
          derivative -=
            (totalPeriods * faceValue) /
            Math.pow(1 + periodicYield, totalPeriods + 1);

          // Price difference
          const diff = price - currentPrice;

          if (Math.abs(diff) < tolerance) {
            break; // Converged to solution
          }

          // Newton-Raphson step
          guess = guess - diff / (derivative * paymentsPerYear);

          // Ensure guess is positive
          if (guess <= 0) guess = 0.0001;

          iteration++;
        }

        // Update the YTM result
        document.getElementById("ytm-result").textContent = `${(
          guess * 100
        ).toFixed(2)}%`;

        // Set required yield to match calculated YTM for consistency in calculations
        document.getElementById("required-yield").value = (guess * 100).toFixed(
          2
        );

        // Recalculate bond with new yield
        calculateBond();
      }

      // Initial calculation
      calculateBond();
    });
  }

  // Bond Calculator functionality
  const bondCalculatorBtn2 = document.querySelector(
    "#bonds-section .action-btn:nth-child(2)"
  );
  if (bondCalculatorBtn2) {
    bondCalculatorBtn2.addEventListener("click", function () {
      // Create modal for bond calculator
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";

      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.borderRadius = "8px";
      modalContent.style.width = "90%";
      modalContent.style.maxWidth = "1200px";
      modalContent.style.maxHeight = "85vh";
      modalContent.style.overflowY = "auto";
      modalContent.style.padding = "2rem";

      // Modal header
      const modalHeader = document.createElement("div");
      modalHeader.style.display = "flex";
      modalHeader.style.justifyContent = "space-between";
      modalHeader.style.alignItems = "center";
      modalHeader.style.marginBottom = "1.5rem";

      const modalTitle = document.createElement("h2");
      modalTitle.textContent = "Bond Calculator";
      modalTitle.style.margin = "0";

      const closeButton = document.createElement("button");
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      closeButton.style.background = "none";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "1.5rem";
      closeButton.style.cursor = "pointer";
      closeButton.style.color = "#718096";

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      // Bond calculator form
      const calculatorForm = document.createElement("div");
      calculatorForm.style.display = "flex";
      calculatorForm.style.flexWrap = "wrap";
      calculatorForm.style.justifyContent = "space-between";
      calculatorForm.style.gap = "1rem";
      calculatorForm.style.marginBottom = "1.5rem";
      calculatorForm.style.padding = "1rem";
      calculatorForm.style.backgroundColor = "#f7fafc";
      calculatorForm.style.borderRadius = "8px";

      // Bond price input
      const bondPriceInput = document.createElement("div");
      bondPriceInput.innerHTML = `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568;">Bond Price</label>
                <input type="number" id="bond-price" placeholder="Enter bond price" style="width: 200px; padding: 0.5rem; border: 1px solid #cbd5e0; border-radius: 4px;">
            `;

      // Coupon rate input
      const couponRateInput = document.createElement("div");
      couponRateInput.innerHTML = `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568;">Coupon Rate</label>
                <input type="number" id="coupon-rate" placeholder="Enter coupon rate" style="width: 200px; padding: 0.5rem; border: 1px solid #cbd5e0; border-radius: 4px;">
            `;

      // Maturity date input
      const maturityDateInput = document.createElement("div");
      maturityDateInput.innerHTML = `
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #4a5568;">Maturity Date</label>
                <input type="date" id="maturity-date" style="width: 200px; padding: 0.5rem; border: 1px solid #cbd5e0; border-radius: 4px;">
            `;

      // Calculate button
      const calculateButton = document.createElement("div");
      calculateButton.innerHTML = `
                <button id="calculate-bond" style="padding: 0.5rem 1rem; background-color: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    <i class="fas fa-calculator"></i> Calculate
                </button>
            `;

      calculatorForm.appendChild(bondPriceInput);
      calculatorForm.appendChild(couponRateInput);
      calculatorForm.appendChild(maturityDateInput);
      calculatorForm.appendChild(calculateButton);

      // Results section
      const resultsSection = document.createElement("div");
      resultsSection.style.display = "flex";
      resultsSection.style.flexWrap = "wrap";
      resultsSection.style.justifyContent = "space-between";
      resultsSection.style.gap = "1rem";
      resultsSection.style.marginBottom = "1.5rem";
      resultsSection.style.padding = "1rem";
      resultsSection.style.backgroundColor = "#f7fafc";
      resultsSection.style.borderRadius = "8px";

      // Result items
      const resultItems = [
        { label: "Total Interest", value: "₹0" },
        { label: "Total Returns", value: "₹0" },
        { label: "Annual Yield", value: "0%" },
        { label: "Breakeven Yield", value: "0%" },
      ];

      resultItems.forEach((item) => {
        const resultItem = document.createElement("div");
        resultItem.style.flex = "1 0 200px";
        resultItem.style.textAlign = "center";
        resultItem.innerHTML = `
                    <div style="font-weight: 500; color: #4a5568;">${item.label}</div>
                    <div style="font-size: 1.25rem; font-weight: 600; color: #2b6cb0;">${item.value}</div>
                `;
        resultsSection.appendChild(resultItem);
      });

      // Assemble all components
      modalContent.appendChild(modalHeader);
      modalContent.appendChild(calculatorForm);
      modalContent.appendChild(resultsSection);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Close modal functionality
      closeButton.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      // Close when clicking outside modal
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
        }
      });

      // Calculate button functionality
      const calculateBondBtn = document.getElementById("calculate-bond");
      if (calculateBondBtn) {
        calculateBondBtn.addEventListener("click", function () {
          const bondPrice = parseFloat(
            document.getElementById("bond-price").value
          );
          const couponRate = parseFloat(
            document.getElementById("coupon-rate").value
          );
          const maturityDate = new Date(
            document.getElementById("maturity-date").value
          );

          // Perform calculations and update results
          const totalInterest = calculateTotalInterest(
            bondPrice,
            couponRate,
            maturityDate
          );
          const totalReturns = calculateTotalReturns(bondPrice, totalInterest);
          const annualYield = calculateAnnualYield(totalInterest, bondPrice);
          const breakevenYield = calculateBreakevenYield(
            totalReturns,
            bondPrice,
            maturityDate
          );

          // Update result items
          const resultItemValues = [
            `₹${totalInterest.toFixed(2)}`,
            `₹${totalReturns.toFixed(2)}`,
            `${annualYield.toFixed(2)}%`,
            `${breakevenYield.toFixed(2)}%`,
          ];

          const resultItemElements = resultsSection.querySelectorAll("div");
          resultItemElements.forEach((element, index) => {
            element.querySelector("div:last-child").textContent =
              resultItemValues[index];
          });
        });
      }
    });
  }

  /**
   * Calculate risk score based on age and investment amount
   * @param {number} age - User's age
   * @param {number} investmentAmount - Investment amount in INR
   * @returns {number} Risk score between 0 and 100
   */
  function calculateRiskScore(age, investmentAmount) {
    // Age factor: Younger investors can take more risk
    // Scale: 0-100, where 0 is most conservative (age 100) and 100 is most aggressive (age 18)
    const ageFactor = Math.max(0, Math.min(100, 100 - (age - 18) * (100 / 82)));

    // Investment amount factor: Larger investments might warrant more conservative approach
    // We'll use a logarithmic scale to reflect that risk tolerance doesn't scale linearly with amount
    // For amounts between ₹1,000 and ₹10,00,000 (1 crore)
    const amountFactor = Math.max(
      0,
      Math.min(100, 100 - (Math.log10(investmentAmount) - 3) * 10)
    );

    // Combine factors with different weights
    // Age is more important (70%) than investment amount (30%) for risk calculation
    const riskScore = Math.round(ageFactor * 0.7 + amountFactor * 0.3);

    return riskScore;
  }

  /**
   * Update the UI with the calculated risk profile
   * @param {number} riskScore - Risk score between 0 and 100
   */
  function updateRiskProfile(riskScore) {
    // Update risk score display
    riskScoreValue.textContent = riskScore;

    // Update risk indicator position (0% for conservative, 100% for aggressive)
    const indicatorPosition = riskScore + "%";
    riskIndicator.style.left = `calc(${indicatorPosition} - 10px)`;

    // Calculate bond allocation based on risk score
    let govtBondsPercentage, corporateBondsPercentage, highYieldBondsPercentage;

    if (riskScore < 30) {
      // Conservative profile
      govtBondsPercentage = 70;
      corporateBondsPercentage = 25;
      highYieldBondsPercentage = 5;
    } else if (riskScore < 70) {
      // Moderate profile
      govtBondsPercentage = 50;
      corporateBondsPercentage = 40;
      highYieldBondsPercentage = 10;
    } else {
      // Aggressive profile
      govtBondsPercentage = 30;
      corporateBondsPercentage = 45;
      highYieldBondsPercentage = 25;
    }

    // Update allocation bars text
    govtBondsBar.querySelector(".allocation-value").textContent =
      govtBondsPercentage + "%";
    corporateBondsBar.querySelector(".allocation-value").textContent =
      corporateBondsPercentage + "%";
    highYieldBondsBar.querySelector(".allocation-value").textContent =
      highYieldBondsPercentage + "%";

    // Set the width of allocation bars using transform: scaleX()
    const govtBondsScale = govtBondsPercentage / 100;
    const corporateBondsScale = corporateBondsPercentage / 100;
    const highYieldBondsScale = highYieldBondsPercentage / 100;

    // Apply the transform with a slight delay for animation effect
    setTimeout(() => {
      // Use direct style manipulation for pseudo-elements
      document.documentElement.style.setProperty(
        "--govt-scale",
        govtBondsScale
      );
      document.documentElement.style.setProperty(
        "--corporate-scale",
        corporateBondsScale
      );
      document.documentElement.style.setProperty(
        "--high-yield-scale",
        highYieldBondsScale
      );
    }, 100);

    // Update bond recommendations based on risk profile
    updateBondRecommendations(riskScore);
  }

  /**
   * Update bond recommendations based on risk score
   * @param {number} riskScore - Risk score between 0 and 100
   */
  function updateBondRecommendations(riskScore) {
    // Clear previous recommendations
    bondRecommendationsList.innerHTML = "";

    // Add recommendations based on risk profile
    const recommendations = [];

    if (riskScore < 30) {
      // Conservative profile recommendations
      recommendations.push({
        icon: "fa-shield-alt",
        text: "Government Securities (G-Secs) with 5-10 year maturity",
      });
      recommendations.push({
        icon: "fa-building",
        text: "AAA-rated PSU Bonds with stable returns",
      });
      recommendations.push({
        icon: "fa-landmark",
        text: "Fixed Deposits and Tax-Free Bonds",
      });
      recommendations.push({
        icon: "fa-chart-line",
        text: "Short-term Corporate Bonds with high credit ratings",
      });
    } else if (riskScore < 70) {
      // Moderate profile recommendations
      recommendations.push({
        icon: "fa-building",
        text: "Corporate Bonds with AA+ or higher ratings",
      });
      recommendations.push({
        icon: "fa-shield-alt",
        text: "Government Securities with medium-term maturity",
      });
      recommendations.push({
        icon: "fa-industry",
        text: "Infrastructure Bonds with tax benefits",
      });
      recommendations.push({
        icon: "fa-chart-line",
        text: "Medium-term Bond Funds with diversified portfolio",
      });
    } else {
      // Aggressive profile recommendations
      recommendations.push({
        icon: "fa-fire",
        text: "High-Yield Corporate Bonds with higher returns",
      });
      recommendations.push({
        icon: "fa-globe",
        text: "International Bond Funds for diversification",
      });
      recommendations.push({
        icon: "fa-industry",
        text: "Long-term Infrastructure Bonds with higher yields",
      });
      recommendations.push({
        icon: "fa-chart-line",
        text: "Strategic Bond Funds with flexible investment mandate",
      });
    }

    // Add recommendations to the list
    recommendations.forEach((recommendation) => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="fas ${recommendation.icon}"></i> ${recommendation.text}`;
      bondRecommendationsList.appendChild(li);
    });
  }

  // Insurance Comparison Modal Functionality
  const compareInsuranceBtn = document.getElementById(
    "compare-insurance-plans-btn"
  );
  const insuranceComparisonModal = document.getElementById(
    "insurance-comparison-modal"
  );
  const closeInsuranceModal = insuranceComparisonModal
    ? insuranceComparisonModal.querySelector(".close-modal")
    : null;
  const planCheckboxes = document.querySelectorAll(".plan-select-checkbox");
  const compareSelectedPlansBtn = document.getElementById(
    "compare-selected-plans"
  );
  const resetComparisonBtn = document.getElementById("reset-comparison");
  const comparisonResults = document.getElementById("comparison-results");
  const comparisonTable = document.getElementById("comparison-table");
  const comparisonTableHeader = document.getElementById(
    "comparison-table-header"
  );
  const printComparisonBtn = document.getElementById("print-comparison");
  const emailComparisonBtn = document.getElementById("email-comparison");
  const saveComparisonBtn = document.getElementById("save-comparison");

  // Open the insurance comparison modal
  if (compareInsuranceBtn) {
    compareInsuranceBtn.addEventListener("click", function () {
      if (insuranceComparisonModal) {
        insuranceComparisonModal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
      }
    });
  }

  // Close the insurance comparison modal
  if (closeInsuranceModal) {
    closeInsuranceModal.addEventListener("click", function () {
      insuranceComparisonModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    });
  }

  // Close the modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === insuranceComparisonModal) {
      insuranceComparisonModal.style.display = "none";
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
  });

  // Handle plan selection
  let selectedPlans = [];

  planCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const planId = this.dataset.plan;

      if (this.checked) {
        // Add plan to selected plans
        if (!selectedPlans.includes(planId)) {
          selectedPlans.push(planId);
        }
      } else {
        // Remove plan from selected plans
        selectedPlans = selectedPlans.filter((id) => id !== planId);
      }

      // Update compare button state
      if (selectedPlans.length >= 2 && selectedPlans.length <= 4) {
        compareSelectedPlansBtn.disabled = false;
      } else {
        compareSelectedPlansBtn.disabled = true;
      }
    });
  });

  // Reset comparison
  if (resetComparisonBtn) {
    resetComparisonBtn.addEventListener("click", function () {
      // Uncheck all checkboxes
      planCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      // Clear selected plans
      selectedPlans = [];

      // Disable compare button
      compareSelectedPlansBtn.disabled = true;

      // Hide comparison results
      comparisonResults.classList.add("hidden");
    });
  }

  // Compare selected plans
  if (compareSelectedPlansBtn) {
    compareSelectedPlansBtn.addEventListener("click", function () {
      if (selectedPlans.length >= 2) {
        // Generate comparison table
        generateComparisonTable(selectedPlans);

        // Show comparison results
        comparisonResults.classList.remove("hidden");

        // Scroll to comparison results
        comparisonResults.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Generate comparison table
  function generateComparisonTable(planIds) {
    // Clear existing table headers (except the first one)
    while (comparisonTableHeader.children.length > 1) {
      comparisonTableHeader.removeChild(comparisonTableHeader.lastChild);
    }

    // Add plan headers
    planIds.forEach((planId) => {
      const plan = insurancePlans[planId];
      const th = document.createElement("th");
      th.innerHTML = `
                <div class="plan-header">
                    <div class="plan-name">${plan.name}</div>
                    <div class="plan-provider">${plan.provider}</div>
                </div>
            `;
      comparisonTableHeader.appendChild(th);
    });

    // Update table rows with plan data
    const rows = comparisonTable.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      // Clear existing cells (except the first one)
      while (row.children.length > 1) {
        row.removeChild(row.lastChild);
      }

      const feature = row.cells[0].textContent;

      // Add plan data cells
      planIds.forEach((planId) => {
        const plan = insurancePlans[planId];
        const td = document.createElement("td");

        switch (feature) {
          case "Plan Type":
            td.textContent = plan.type;
            break;
          case "Provider":
            td.textContent = plan.provider;
            break;
          case "Coverage":
            td.textContent = plan.coverage;
            break;
          case "Premium":
            td.textContent = plan.premium;
            break;
          case "Claim Settlement Ratio":
            td.textContent = plan.claimSettlement;
            // Highlight the best claim settlement ratio
            if (isHighestClaimSettlement(plan.claimSettlement, planIds)) {
              td.classList.add("better-value");
            }
            break;
          case "Key Benefits":
            td.innerHTML = `<ul class="feature-list">
                            ${plan.keyBenefits
                              .map((benefit) => `<li>${benefit}</li>`)
                              .join("")}
                        </ul>`;
            break;
          case "Exclusions":
            td.innerHTML = `<ul class="feature-list">
                            ${plan.exclusions
                              .map((exclusion) => `<li>${exclusion}</li>`)
                              .join("")}
                        </ul>`;
            break;
          case "Waiting Period":
            td.textContent = plan.waitingPeriod;
            break;
        }

        row.appendChild(td);
      });
    });
  }

  // Helper function to check if a claim settlement ratio is the highest
  function isHighestClaimSettlement(ratio, planIds) {
    const numericRatio = parseFloat(ratio.replace("%", ""));

    for (const planId of planIds) {
      const otherRatio = parseFloat(
        insurancePlans[planId].claimSettlement.replace("%", "")
      );
      if (otherRatio > numericRatio) {
        return false;
      }
    }

    return true;
  }

  // Print comparison
  if (printComparisonBtn) {
    printComparisonBtn.addEventListener("click", function () {
      const printWindow = window.open("", "_blank");

      printWindow.document.write(`
                <html>
                <head>
                    <title>Insurance Plan Comparison</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { color: #2d3748; text-align: center; margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                        th, td { padding: 10px; text-align: left; border: 1px solid #e2e8f0; }
                        th { background-color: #faf089; font-weight: bold; }
                        tr:nth-child(even) { background-color: #f7fafc; }
                        .better-value { color: #48bb78; font-weight: bold; }
                        ul { padding-left: 20px; margin: 0; }
                        li { margin-bottom: 5px; }
                        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #718096; }
                    </style>
                </head>
                <body>
                    <h1>Insurance Plan Comparison</h1>
                    ${comparisonTable.outerHTML}
                    <div class="footer">
                        <p>Generated on ${new Date().toLocaleDateString()} by InvestWise</p>
                    </div>
                </body>
                </html>
            `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    });
  }

  // Email comparison (mock functionality)
  if (emailComparisonBtn) {
    emailComparisonBtn.addEventListener("click", function () {
      const emailModal = document.createElement("div");
      emailModal.className = "email-modal";
      emailModal.innerHTML = `
                <div class="email-modal-content">
                    <span class="close-email-modal">&times;</span>
                    <h3>Email Comparison</h3>
                    <p>Enter your email address to receive this comparison:</p>
                    <input type="email" id="email-input" placeholder="your@email.com">
                    <button id="send-email-btn">Send</button>
                </div>
            `;

      document.body.appendChild(emailModal);

      const closeEmailModal = emailModal.querySelector(".close-email-modal");
      const sendEmailBtn = emailModal.querySelector("#send-email-btn");

      closeEmailModal.addEventListener("click", function () {
        document.body.removeChild(emailModal);
      });

      sendEmailBtn.addEventListener("click", function () {
        const emailInput = emailModal.querySelector("#email-input");
        const email = emailInput.value.trim();

        if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          alert(
            `Comparison would be sent to ${email} (This is a demo feature)`
          );
          document.body.removeChild(emailModal);
        } else {
          alert("Please enter a valid email address");
        }
      });
    });
  }

  // Save as PDF (mock functionality)
  if (saveComparisonBtn) {
    saveComparisonBtn.addEventListener("click", function () {
      alert("Comparison would be saved as PDF (This is a demo feature)");
    });
  }

  // Function to update insurance comparison UI
  function updateInsuranceComparisonUI() {
    // This function can be used to update the UI based on user interactions
    // For example, highlighting selected plans, showing additional information, etc.
  }

  // Mutual Fund Risk Calculator Modal Functionality
  document.addEventListener("DOMContentLoaded", function () {
    // Check if risk_calculator.js is loaded before attaching event listeners
    if (!window.riskCalculatorInitialized) {
      const fundRiskCalculatorBtn = document.getElementById(
        "fund-risk-calculator-btn"
      );
      const fundRiskCalculatorModal = document.getElementById(
        "fund-risk-calculator-modal"
      );
      const closeFundModal = fundRiskCalculatorModal
        ? fundRiskCalculatorModal.querySelector(".close-modal")
        : null;
      const calculateFundRiskBtn = document.getElementById(
        "calculate-fund-risk"
      );

      if (fundRiskCalculatorBtn && fundRiskCalculatorModal) {
        fundRiskCalculatorBtn.addEventListener("click", function () {
          fundRiskCalculatorModal.style.display = "block";
          document.body.style.overflow = "hidden";
        });

        if (closeFundModal) {
          closeFundModal.addEventListener("click", function () {
            fundRiskCalculatorModal.style.display = "none";
            document.body.style.overflow = "auto";
          });
        }

        window.addEventListener("click", function (event) {
          if (event.target === fundRiskCalculatorModal) {
            fundRiskCalculatorModal.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });

        if (calculateFundRiskBtn) {
          calculateFundRiskBtn.addEventListener(
            "click",
            calculateFundRiskProfile
          );
        }
      }
    }
  });

  // Mutual Fund Data
  const mutualFundsData = [
    {
      name: "HDFC Top 100 Fund",
      category: "large-cap",
      rating: 5,
      aum: 21500,
      returns: {
        "1Y": 15.8,
        "3Y": 12.5,
        "5Y": 14.2,
      },
      riskLevel: "moderate",
      nav: 125.45,
      expenseRatio: 1.25,
      exitLoad: "1% if redeemed within 1 year",
    },
    {
      name: "Axis Midcap Fund",
      category: "mid-cap",
      rating: 5,
      aum: 12800,
      returns: {
        "1Y": 18.2,
        "3Y": 15.8,
        "5Y": 16.5,
      },
      riskLevel: "high",
      nav: 85.3,
      expenseRatio: 1.75,
      exitLoad: "1% if redeemed within 1 year",
    },
    {
      name: "SBI Small Cap Fund",
      category: "small-cap",
      rating: 4,
      aum: 8500,
      returns: {
        "1Y": 22.5,
        "3Y": 16.2,
        "5Y": 18.8,
      },
      riskLevel: "very-high",
      nav: 92.15,
      expenseRatio: 1.85,
      exitLoad: "1% if redeemed within 1 year",
    },
    {
      name: "Mirae Asset Tax Saver Fund",
      category: "elss",
      rating: 5,
      aum: 9200,
      returns: {
        "1Y": 16.5,
        "3Y": 14.2,
        "5Y": 15.6,
      },
      riskLevel: "moderate",
      nav: 45.75,
      expenseRatio: 1.55,
      exitLoad: "Locked in for 3 years",
    },
    {
      name: "ICICI Prudential Corporate Bond Fund",
      category: "debt",
      rating: 4,
      aum: 15600,
      returns: {
        "1Y": 7.2,
        "3Y": 8.5,
        "5Y": 8.1,
      },
      riskLevel: "low",
      nav: 25.8,
      expenseRatio: 0.95,
      exitLoad: "0.25% if redeemed within 1 month",
    },
  ];

  // Initialize Fund Screener
  document.addEventListener("DOMContentLoaded", function () {
    // Check if fund_screener.js is loaded before attaching event listeners
    if (!window.fundScreenerInitialized) {
      const fundScreenerBtn = document.getElementById("fund-screener-btn");

      if (fundScreenerBtn) {
        fundScreenerBtn.addEventListener("click", showFundScreener);
      } else {
        // Fallback to selector if ID is not found
        const buttons = document.querySelectorAll(
          ".section-actions .action-btn"
        );
        buttons.forEach((btn) => {
          if (btn.textContent.includes("Fund Screener")) {
            btn.addEventListener("click", showFundScreener);
          }
        });
      }

      // Initialize with saved settings if available
      const savedSettings = localStorage.getItem("fundScreenerSettings");
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          applyFundScreenerSettings(settings);
        } catch (error) {
          console.error("Error loading saved fund screener settings:", error);
        }
      }
    }
  });

  function loadSavedScreenerSettings(settings) {
    // Set category options
    const categorySelect = document.getElementById("fund-category");
    if (settings.categories && categorySelect) {
      Array.from(categorySelect.options).forEach((option) => {
        option.selected = settings.categories.includes(option.value);
      });
    }

    // Set minimum rating
    if (settings.minRating) {
      document.getElementById("min-rating").value = settings.minRating;
    }

    // Set minimum AUM
    if (settings.minAUM) {
      document.getElementById("min-aum").value = settings.minAUM;
    }

    // Set return values
    if (settings.returns) {
      if (settings.returns["1Y"])
        document.getElementById("return-1y").value = settings.returns["1Y"];
      if (settings.returns["3Y"])
        document.getElementById("return-3y").value = settings.returns["3Y"];
      if (settings.returns["5Y"])
        document.getElementById("return-5y").value = settings.returns["5Y"];
    }

    // Set risk levels
    const riskSelect = document.getElementById("risk-level");
    if (settings.riskLevels && riskSelect) {
      Array.from(riskSelect.options).forEach((option) => {
        option.selected = settings.riskLevels.includes(option.value);
      });
    }

    // Automatically apply the filters
    applyFundFilters();
  }

  function showFundScreener() {
    const modal = document.getElementById("fund-screener-modal");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Apply filters
    const applyFiltersBtn = document.getElementById("apply-filters");
    applyFiltersBtn.addEventListener("click", applyFundFilters);

    // Export results
    const exportBtn = document.getElementById("export-results");
    exportBtn.addEventListener("click", exportScreenerResults);

    // Save screener
    const saveBtn = document.getElementById("save-screener");
    saveBtn.addEventListener("click", saveScreenerSettings);

    // Show comparison
    const showComparisonBtn = document.getElementById("show-comparison");
    if (showComparisonBtn) {
      showComparisonBtn.addEventListener("click", showFundComparison);
    }

    // Update list of selected funds for comparison if there are any
    updateSelectedFundsUI();
  }

  function applyFundFilters() {
    const categories = Array.from(
      document.getElementById("fund-category").selectedOptions
    ).map((opt) => opt.value);
    const minRating = parseInt(document.getElementById("min-rating").value);
    const minAUM = parseFloat(document.getElementById("min-aum").value);
    const return1Y = parseFloat(document.getElementById("return-1y").value);
    const return3Y = parseFloat(document.getElementById("return-3y").value);
    const return5Y = parseFloat(document.getElementById("return-5y").value);
    const riskLevels = Array.from(
      document.getElementById("risk-level").selectedOptions
    ).map((opt) => opt.value);

    // Filter funds based on criteria
    const filteredFunds = mutualFundsData.filter((fund) => {
      const categoryMatch =
        categories.length === 0 || categories.includes(fund.category);
      const ratingMatch = !minRating || fund.rating >= minRating;
      const aumMatch = !minAUM || fund.aum >= minAUM;
      const return1YMatch = !return1Y || fund.returns["1Y"] >= return1Y;
      const return3YMatch = !return3Y || fund.returns["3Y"] >= return3Y;
      const return5YMatch = !return5Y || fund.returns["5Y"] >= return5Y;
      const riskMatch =
        riskLevels.length === 0 || riskLevels.includes(fund.riskLevel);

      return (
        categoryMatch &&
        ratingMatch &&
        aumMatch &&
        return1YMatch &&
        return3YMatch &&
        return5YMatch &&
        riskMatch
      );
    });

    displayScreenerResults(filteredFunds);
  }

  function displayScreenerResults(funds) {
    const resultsContainer = document.getElementById("screener-results");
    const resultsBody = document.getElementById("screener-results-body");
    resultsBody.innerHTML = "";

    if (funds.length === 0) {
      resultsBody.innerHTML = `
                <tr>
                    <td colspan="9" class="no-results">No funds match your criteria</td>
                </tr>
            `;
    } else {
      funds.forEach((fund) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${fund.name}</td>
                    <td>${formatCategory(fund.category)}</td>
                    <td>${"★".repeat(fund.rating)}</td>
                    <td>₹${formatNumber(fund.aum)}</td>
                    <td class="${getReturnClass(
                      fund.returns["1Y"]
                    )}">${fund.returns["1Y"].toFixed(1)}%</td>
                    <td class="${getReturnClass(
                      fund.returns["3Y"]
                    )}">${fund.returns["3Y"].toFixed(1)}%</td>
                    <td class="${getReturnClass(
                      fund.returns["5Y"]
                    )}">${fund.returns["5Y"].toFixed(1)}%</td>
                    <td>${formatRiskLevel(fund.riskLevel)}</td>
                    <td>
                        <button class="view-fund" onclick="viewFundDetails('${
                          fund.name
                        }')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="add-to-compare" onclick="addFundToCompare('${
                          fund.name
                        }')">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </td>
                `;
        resultsBody.appendChild(row);
      });
    }

    resultsContainer.classList.remove("hidden");
  }

  function formatCategory(category) {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatNumber(num) {
    return num >= 1000 ? (num / 1000).toFixed(2) + "K" : num.toFixed(2);
  }

  function getReturnClass(returnValue) {
    if (returnValue > 15) return "very-high-return";
    if (returnValue > 10) return "high-return";
    if (returnValue > 5) return "moderate-return";
    if (returnValue > 0) return "low-return";
    return "negative-return";
  }

  function formatRiskLevel(risk) {
    return risk
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function viewFundDetails(fundName) {
    const fund = mutualFundsData.find((f) => f.name === fundName);
    if (fund) {
      // Create a modal to display fund details
      const detailsModal = document.createElement("div");
      detailsModal.className = "modal fund-details-modal";

      // Calculate and format additional metrics
      const sharpeRatio = (fund.returns["3Y"] / fund.volatility).toFixed(2);
      const alphaValue = (fund.returns["3Y"] - 8.5).toFixed(2); // Assuming benchmark return of 8.5%

      // Format portfolio allocation as a simple chart
      let portfolioHtml = "";
      if (fund.portfolioAllocation) {
        for (const [sector, percentage] of Object.entries(
          fund.portfolioAllocation
        )) {
          portfolioHtml += `
                    <div class="allocation-item">
                        <span>${sector}</span>
                        <div class="allocation-bar">
                            <div class="allocation-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span>${percentage}%</span>
                    </div>`;
        }
      } else {
        // Sample portfolio allocation if not defined in the data
        portfolioHtml = `
                <div class="allocation-item">
                    <span>Financial Services</span>
                    <div class="allocation-bar"><div class="allocation-fill" style="width: 28%"></div></div>
                    <span>28%</span>
                </div>
                <div class="allocation-item">
                    <span>Technology</span>
                    <div class="allocation-bar"><div class="allocation-fill" style="width: 22%"></div></div>
                    <span>22%</span>
                </div>
                <div class="allocation-item">
                    <span>Consumer Goods</span>
                    <div class="allocation-bar"><div class="allocation-fill" style="width: 15%"></div></div>
                    <span>15%</span>
                </div>`;
      }

      detailsModal.innerHTML = `
                <div class="modal-content fund-details-content">
                    <span class="close-modal">&times;</span>
                    <div class="fund-details-header">
                        <h2>${fund.name}</h2>
                        <div class="fund-basic-info">
                            <span class="fund-category">${formatCategory(
                              fund.category
                            )}</span>
                            <span class="fund-rating">${"★".repeat(
                              fund.rating
                            )}</span>
                            <span class="fund-risk">${formatRiskLevel(
                              fund.riskLevel
                            )}</span>
                        </div>
                    </div>
                    
                    <div class="fund-details-tabs">
                        <button class="tab-btn active" data-tab="overview">Overview</button>
                        <button class="tab-btn" data-tab="performance">Performance</button>
                        <button class="tab-btn" data-tab="portfolio">Portfolio</button>
                        <button class="tab-btn" data-tab="risk">Risk Analysis</button>
                    </div>
                    
                    <div class="fund-details-content">
                        <div class="tab-content active" id="overview">
                            <div class="info-card">
                                <h3>Fund Information</h3>
                                <div class="info-grid">
                                    <div class="info-item">
                                        <label>NAV</label>
                                        <span>₹${fund.nav}</span>
                                    </div>
                                    <div class="info-item">
                                        <label>AUM</label>
                                        <span>₹${fund.aum} Cr</span>
                                    </div>
                                    <div class="info-item">
                                        <label>Expense Ratio</label>
                                        <span>${fund.expenseRatio}%</span>
                                    </div>
                                    <div class="info-item">
                                        <label>Exit Load</label>
                                        <span>${fund.exitLoad}</span>
                                    </div>
                                    <div class="info-item">
                                        <label>Fund Manager</label>
                                        <span>${
                                          fund.manager || "Not Available"
                                        }</span>
                                    </div>
                                    <div class="info-item">
                                        <label>Launch Date</label>
                                        <span>${
                                          fund.launchDate || "Not Available"
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="action-buttons">
                                <button class="action-btn primary">
                                    <i class="fas fa-shopping-cart"></i> Invest Now
                                </button>
                                <button class="action-btn" onclick="addFundToCompare('${
                                  fund.name
                                }')">
                                    <i class="fas fa-balance-scale"></i> Add to Compare
                                </button>
                                <button class="action-btn">
                                    <i class="far fa-heart"></i> Add to Watchlist
                                </button>
                            </div>
                        </div>
                        
                        <div class="tab-content" id="performance">
                            <h3>Returns</h3>
                            <div class="returns-grid">
                                <div class="return-item ${getReturnClass(
                                  fund.returns["1Y"]
                                )}">
                                    <label>1 Year</label>
                                    <span>${fund.returns["1Y"].toFixed(
                                      1
                                    )}%</span>
                                </div>
                                <div class="return-item ${getReturnClass(
                                  fund.returns["3Y"]
                                )}">
                                    <label>3 Years</label>
                                    <span>${fund.returns["3Y"].toFixed(
                                      1
                                    )}%</span>
                                </div>
                                <div class="return-item ${getReturnClass(
                                  fund.returns["5Y"]
                                )}">
                                    <label>5 Years</label>
                                    <span>${fund.returns["5Y"].toFixed(
                                      1
                                    )}%</span>
                                </div>
                            </div>
                            <p>Performance data as of last month-end. Returns greater than 1 year are annualized.</p>
                        </div>
                        
                        <div class="tab-content" id="portfolio">
                            <h3>Portfolio Allocation</h3>
                            <div class="portfolio-allocation">
                                ${portfolioHtml}
                            </div>
                        </div>
                        
                        <div class="tab-content" id="risk">
                            <h3>Risk Metrics</h3>
                            <div class="risk-metrics">
                                <div class="metric-item">
                                    <label>Volatility (Std Dev)</label>
                                    <span>${fund.volatility || "12.8"}%</span>
                                </div>
                                <div class="metric-item">
                                    <label>Sharpe Ratio</label>
                                    <span>${sharpeRatio}</span>
                                </div>
                                <div class="metric-item">
                                    <label>Alpha</label>
                                    <span>${alphaValue}%</span>
                                </div>
                                <div class="metric-item">
                                    <label>Beta</label>
                                    <span>${fund.beta || "0.95"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(detailsModal);
      detailsModal.style.display = "block";

      // Tab functionality
      const tabBtns = detailsModal.querySelectorAll(".tab-btn");
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          // Remove active class from all tabs and content
          tabBtns.forEach((tb) => tb.classList.remove("active"));
          detailsModal.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
          });

          // Add active class to clicked tab and corresponding content
          btn.classList.add("active");
          const tabId = btn.getAttribute("data-tab");
          detailsModal.querySelector(`#${tabId}`).classList.add("active");
        });
      });

      // Close modal functionality
      const closeBtn = detailsModal.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        detailsModal.style.display = "none";
        detailsModal.remove();
      });

      // Close when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === detailsModal) {
          detailsModal.style.display = "none";
          detailsModal.remove();
        }
      });
    }
  }

  function addFundToCompare(fundName) {
    let compareList = JSON.parse(localStorage.getItem("fundComparison")) || [];

    if (compareList.includes(fundName)) {
      compareList = compareList.filter((f) => f !== fundName);
      alert(`${fundName} removed from comparison list`);
    } else {
      if (compareList.length >= 4) {
        alert(
          "You can compare up to 4 funds at a time. Please remove a fund before adding a new one."
        );
        return;
      }
      compareList.push(fundName);
      alert(`${fundName} added to comparison list`);
    }

    localStorage.setItem("fundComparison", JSON.stringify(compareList));

    // Update the UI if we're in the comparison modal
    if (
      document.getElementById("fund-comparison-modal").style.display === "block"
    ) {
      updateSelectedFundsUI();
      updateComparisonTable();
    }
  }

  function updateSelectedFundsUI() {
    const selectedFundsList = document.getElementById("selected-funds-list");
    if (!selectedFundsList) return;

    selectedFundsList.innerHTML = "";

    const compareList =
      JSON.parse(localStorage.getItem("fundComparison")) || [];

    if (compareList.length === 0) {
      selectedFundsList.innerHTML = "<p>No funds selected for comparison</p>";
      return;
    }

    compareList.forEach((fundName) => {
      const fundTag = document.createElement("div");
      fundTag.className = "fund-tag";
      fundTag.innerHTML = `
                ${fundName}
                <button class="remove-fund" onclick="removeFundFromComparison('${fundName}')">
                    <i class="fas fa-times"></i>
                </button>
            `;
      selectedFundsList.appendChild(fundTag);
    });
  }

  function removeFundFromComparison(fundName) {
    let compareList = JSON.parse(localStorage.getItem("fundComparison")) || [];
    compareList = compareList.filter((f) => f !== fundName);
    localStorage.setItem("fundComparison", JSON.stringify(compareList));

    updateSelectedFundsUI();
    updateComparisonTable();
  }

  function showFundComparison() {
    const compareList =
      JSON.parse(localStorage.getItem("fundComparison")) || [];

    if (compareList.length < 2) {
      alert("Please select at least 2 funds to compare");
      return;
    }

    const modal = document.getElementById("fund-comparison-modal");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Close modal functionality
    const closeBtn = modal.querySelector(".close-modal");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Clear all button
    const clearBtn = document.getElementById("clear-comparison");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.setItem("fundComparison", JSON.stringify([]));
        updateSelectedFundsUI();
        updateComparisonTable();
      });
    }

    // Update comparison button
    const updateBtn = document.getElementById("update-comparison");
    if (updateBtn) {
      updateBtn.addEventListener("click", updateComparisonTable);
    }

    // Print comparison button
    const printBtn = document.getElementById("print-fund-comparison");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Set up investor profile input handlers
    const investorInputs = document.querySelectorAll(
      "#investor-age, #investment-horizon, #risk-preference"
    );
    investorInputs.forEach((input) => {
      input.addEventListener("change", updateComparisonTable);
    });

    // Update the UI
    updateSelectedFundsUI();
    updateComparisonTable();
    drawComparisonChart();
  }

  function updateComparisonTable() {
    const compareList =
      JSON.parse(localStorage.getItem("fundComparison")) || [];
    const notificationEl = document.getElementById("comparison-notification");
    const tableContainer = document.getElementById(
      "funds-comparison-table-container"
    );
    const chartContainer = document.querySelector(
      ".comparison-chart-container"
    );

    if (compareList.length < 2) {
      if (notificationEl) notificationEl.classList.remove("hidden");
      if (tableContainer) tableContainer.style.display = "none";
      if (chartContainer) chartContainer.style.display = "none";
      return;
    }

    if (notificationEl) notificationEl.classList.add("hidden");
    if (tableContainer) tableContainer.style.display = "block";
    if (chartContainer) chartContainer.style.display = "block";

    // Get fund data
    const fundsData = [];
    compareList.forEach((fundName) => {
      const fund = mutualFundsData.find((f) => f.name === fundName);
      if (fund) fundsData.push(fund);
    });

    // Get investor profile
    const investorAge =
      parseInt(document.getElementById("investor-age").value) || 30;
    const investmentHorizon =
      parseInt(document.getElementById("investment-horizon").value) || 10;
    const riskPreference =
      document.getElementById("risk-preference").value || "moderate";

    // Calculate suitability scores for each fund based on investor profile
    const fundScores = calculateFundSuitabilityScores(
      fundsData,
      investorAge,
      investmentHorizon,
      riskPreference
    );

    // Find the fund with the highest score (best match)
    const bestMatch = fundScores.reduce(
      (best, current) => (current.score > best.score ? current : best),
      fundScores[0]
    );

    // Update table header
    const tableHeader = document.getElementById("comparison-table-header");
    if (tableHeader) {
      tableHeader.innerHTML = "<th>Features</th>";
      fundsData.forEach((fund) => {
        const isBestMatch = fund.name === bestMatch.fund.name;
        tableHeader.innerHTML += `<th class="${
          isBestMatch ? "best-match" : ""
        }">${fund.name}</th>`;
      });
    }

    // Update table rows
    const table = document.getElementById("funds-comparison-table");
    if (table) {
      const rows = table.querySelectorAll("tbody tr");

      // Category
      if (rows[0]) {
        rows[0].innerHTML = "<td>Category</td>";
        fundsData.forEach((fund) => {
          rows[0].innerHTML += `<td>${formatCategory(fund.category)}</td>`;
        });
      }

      // Fund Type
      if (rows[1]) {
        rows[1].innerHTML = "<td>Fund Type</td>";
        fundsData.forEach((fund) => {
          rows[1].innerHTML += `<td>${fund.type || "N/A"}</td>`;
        });
      }

      // Rating
      if (rows[2]) {
        rows[2].innerHTML = "<td>Rating</td>";
        fundsData.forEach((fund) => {
          rows[2].innerHTML += `<td>${"★".repeat(fund.rating)}</td>`;
        });
      }

      // NAV
      if (rows[3]) {
        rows[3].innerHTML = "<td>NAV</td>";
        fundsData.forEach((fund) => {
          rows[3].innerHTML += `<td>₹${fund.nav}</td>`;
        });
      }

      // AUM
      if (rows[4]) {
        rows[4].innerHTML = "<td>AUM</td>";
        fundsData.forEach((fund) => {
          rows[4].innerHTML += `<td>₹${fund.aum} Cr</td>`;
        });
      }

      // Expense Ratio
      if (rows[5]) {
        rows[5].innerHTML = "<td>Expense Ratio</td>";
        const expenseRatios = fundsData.map((fund) => fund.expenseRatio);
        const lowestExpenseRatio = Math.min(...expenseRatios);

        fundsData.forEach((fund) => {
          const isLowest = fund.expenseRatio === lowestExpenseRatio;
          rows[5].innerHTML += `<td>${fund.expenseRatio}%</td>`;
        });
      }

      // 1Y Return
      if (rows[6]) {
        rows[6].innerHTML = "<td>1Y Return</td>";
        fundsData.forEach((fund) => {
          const returnClass = getReturnClass(fund.returns["1Y"]);
          rows[6].innerHTML += `<td class="${returnClass}">${fund.returns[
            "1Y"
          ].toFixed(1)}%</td>`;
        });
      }

      // 3Y Return
      if (rows[7]) {
        rows[7].innerHTML = "<td>3Y Return</td>";
        fundsData.forEach((fund) => {
          const returnClass = getReturnClass(fund.returns["3Y"]);
          rows[7].innerHTML += `<td class="${returnClass}">${fund.returns[
            "3Y"
          ].toFixed(1)}%</td>`;
        });
      }

      // 5Y Return
      if (rows[8]) {
        rows[8].innerHTML = "<td>5Y Return</td>";
        fundsData.forEach((fund) => {
          const returnClass = getReturnClass(fund.returns["5Y"]);
          rows[8].innerHTML += `<td class="${returnClass}">${fund.returns[
            "5Y"
          ].toFixed(1)}%</td>`;
        });
      }

      // Risk Level
      if (rows[9]) {
        rows[9].innerHTML = "<td>Risk Level</td>";
        fundsData.forEach((fund) => {
          rows[9].innerHTML += `<td>${formatRiskLevel(fund.riskLevel)}</td>`;
        });
      }

      // Min. Investment
      if (rows[10]) {
        rows[10].innerHTML = "<td>Min. Investment</td>";
        fundsData.forEach((fund) => {
          rows[10].innerHTML += `<td>₹${fund.minInvestment || 5000}</td>`;
        });
      }

      // Exit Load
      if (rows[11]) {
        rows[11].innerHTML = "<td>Exit Load</td>";
        fundsData.forEach((fund) => {
          rows[11].innerHTML += `<td>${fund.exitLoad || "N/A"}</td>`;
        });
      }

      // Add a new row for overall recommendation
      const recommendationRow = document.createElement("tr");
      recommendationRow.innerHTML =
        "<td><strong>Overall Recommendation</strong></td>";

      fundsData.forEach((fund) => {
        const fundScore = fundScores.find(
          (score) => score.fund.name === fund.name
        );
        const isBestMatch = fund.name === bestMatch.fund.name;
        const score = fundScore ? fundScore.score.toFixed(1) : "N/A";

        let projectedReturn;
        if (fundScore) {
          // Calculate projected return based on fund performance and investment horizon
          projectedReturn = calculateProjectedReturn(fund, investmentHorizon);

          // Determine return class
          const returnClass =
            projectedReturn > 12
              ? "high"
              : projectedReturn > 8
              ? "medium"
              : "low";

          recommendationRow.innerHTML += `
                        <td class="${isBestMatch ? "highlight-better" : ""}">
                            <strong>Score: ${score}/10</strong>
                            <span class="expected-return ${returnClass}">
                                Est. ${investmentHorizon}Y Return: ${projectedReturn.toFixed(
            1
          )}%
                            </span>
                        </td>
                    `;
        } else {
          recommendationRow.innerHTML += `<td>Score: N/A</td>`;
        }
      });

      // Add the recommendation row
      table.querySelector("tbody").appendChild(recommendationRow);
    }
  }

  /**
   * Calculate fund suitability scores based on investor profile
   */
  function calculateFundSuitabilityScores(
    funds,
    investorAge,
    investmentHorizon,
    riskPreference
  ) {
    // Convert risk preference to a numeric value
    const riskPreferenceValue =
      riskPreference === "aggressive"
        ? 3
        : riskPreference === "moderate"
        ? 2
        : 1;

    // Calculate risk tolerance based on age (decreases with age)
    const ageBasedRiskTolerance = Math.max(1, 5 - Math.floor(investorAge / 15));

    // Calculate overall risk score (combination of preference and age)
    const riskToleranceScore =
      (riskPreferenceValue + ageBasedRiskTolerance) / 2;

    return funds.map((fund) => {
      // Convert fund risk level to a numeric value
      const fundRiskValue =
        fund.riskLevel === "very-high"
          ? 5
          : fund.riskLevel === "high"
          ? 4
          : fund.riskLevel === "moderate"
          ? 3
          : fund.riskLevel === "low"
          ? 2
          : 1;

      // Calculate how well the fund's risk matches the investor's tolerance
      const riskMatchScore =
        10 - Math.abs(fundRiskValue - riskToleranceScore) * 2;

      // Calculate return scores based on investment horizon
      let returnScore;
      if (investmentHorizon <= 2) {
        // Short-term: 1Y return is most important
        returnScore = fund.returns["1Y"] / 2;
      } else if (investmentHorizon <= 5) {
        // Medium-term: 3Y return is most important
        returnScore = fund.returns["3Y"] / 2;
      } else {
        // Long-term: 5Y return is most important
        returnScore = fund.returns["5Y"] / 2;
      }

      // Calculate expense ratio score (lower is better)
      const expenseRatioScore = 10 - fund.expenseRatio * 2;

      // Calculate category match score based on age and investment horizon
      let categoryMatchScore = 5;
      if (investorAge > 60) {
        // Older investors: prefer debt and low risk
        categoryMatchScore = fund.category.includes("debt")
          ? 10
          : fund.category === "hybrid"
          ? 7
          : 3;
      } else if (investorAge > 40) {
        // Middle-aged: prefer balance
        categoryMatchScore =
          fund.category === "hybrid"
            ? 10
            : fund.category === "multi-cap"
            ? 8
            : 5;
      } else {
        // Younger: prefer equity for growth
        categoryMatchScore = fund.category.includes("cap")
          ? 10
          : fund.category === "elss"
          ? 9
          : fund.category === "hybrid"
          ? 7
          : 4;
      }

      // Calculate overall score
      const score =
        riskMatchScore * 0.3 +
        returnScore * 0.3 +
        expenseRatioScore * 0.2 +
        categoryMatchScore * 0.2;

      // Determine which aspects make this fund a good choice
      const isGoodRiskMatch = riskMatchScore > 7;
      const isGoodExpenseRatio = expenseRatioScore > 7;
      const isGoodCategoryMatch = categoryMatchScore > 7;

      // Determine which timeframe returns are best for this fund
      let isGoodShortTerm = false;
      let isGoodMidTerm = false;
      let isGoodLongTerm = false;

      if (investmentHorizon <= 2) {
        isGoodShortTerm = fund.returns["1Y"] > 10;
      } else if (investmentHorizon <= 5) {
        isGoodMidTerm = fund.returns["3Y"] > 12;
      } else {
        isGoodLongTerm = fund.returns["5Y"] > 14;
      }

      return {
        fund: fund,
        score: score,
        riskMatch: isGoodRiskMatch,
        lowExpense: isGoodExpenseRatio,
        categoryMatch: isGoodCategoryMatch,
        shortTermReturns: isGoodShortTerm,
        midTermReturns: isGoodMidTerm,
        longTermReturns: isGoodLongTerm,
      };
    });
  }

  /**
   * Calculate projected return for a fund based on investment horizon
   */
  function calculateProjectedReturn(fund, investmentHorizon) {
    let baseReturn;

    // Use the most relevant return metric based on investment horizon
    if (investmentHorizon <= 2) {
      baseReturn = fund.returns["1Y"];
    } else if (investmentHorizon <= 5) {
      baseReturn = fund.returns["3Y"];
    } else {
      baseReturn = fund.returns["5Y"];
    }

    // Apply a regression factor (returns tend to normalize over time)
    const regressionFactor = 0.9 + (0.1 * Math.min(investmentHorizon, 10)) / 10;

    // Account for expense ratio drag over time
    const expenseRatioDrag = fund.expenseRatio * (1 - 1 / investmentHorizon);

    // Calculate projected return
    let projectedReturn = baseReturn * regressionFactor - expenseRatioDrag;

    // Apply risk adjustment
    const riskAdjustment =
      fund.riskLevel === "very-high"
        ? 2
        : fund.riskLevel === "high"
        ? 1
        : fund.riskLevel === "moderate"
        ? 0
        : fund.riskLevel === "low"
        ? -0.5
        : -1;

    projectedReturn += riskAdjustment;

    // Ensure the return is within reasonable bounds
    return Math.max(1, Math.min(30, projectedReturn));
  }

  function exportScreenerResults() {
    const table = document.getElementById("screener-table");
    const rows = Array.from(table.querySelectorAll("tr"));

    let csv = [];
    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      const rowData = cells.map((cell) => {
        // Remove HTML and clean the text
        return `"${cell.textContent.trim().replace(/"/g, '""')}"`;
      });
      csv.push(rowData.join(","));
    });

    const csvContent = csv.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fund_screener_results.csv";
    link.click();
  }

  function saveScreenerSettings() {
    const settings = {
      categories: Array.from(
        document.getElementById("fund-category").selectedOptions
      ).map((opt) => opt.value),
      minRating: document.getElementById("min-rating").value,
      minAUM: document.getElementById("min-aum").value,
      returns: {
        "1Y": document.getElementById("return-1y").value,
        "3Y": document.getElementById("return-3y").value,
        "5Y": document.getElementById("return-5y").value,
      },
      riskLevels: Array.from(
        document.getElementById("risk-level").selectedOptions
      ).map((opt) => opt.value),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("fundScreenerSettings", JSON.stringify(settings));

    // Show confirmation to user
    alert("Fund Screener settings saved successfully!");

    // Optional: Create a UI element for better UX instead of an alert
    // const notification = document.createElement('div');
    // notification.className = 'notification success';
    // notification.textContent = 'Fund Screener settings saved successfully!';
    // document.body.appendChild(notification);
    // setTimeout(() => notification.remove(), 3000);
  }

  // Helper function to generate random colors for the chart
  function getRandomColor() {
    const colors = [
      "#4e73df",
      "#1cc88a",
      "#36b9cc",
      "#f6c23e",
      "#e74a3b",
      "#6f42c1",
      "#fd7e14",
      "#20c9a6",
      "#5a5c69",
      "#858796",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /**
   * Calculate fund suitability scores based on investor profile
   */
  function calculateFundSuitabilityScores(
    funds,
    investorAge,
    investmentHorizon,
    riskPreference
  ) {
    // Convert risk preference to a numeric value
    const riskPreferenceValue =
      riskPreference === "aggressive"
        ? 3
        : riskPreference === "moderate"
        ? 2
        : 1;

    // Calculate risk tolerance based on age (decreases with age)
    const ageBasedRiskTolerance = Math.max(1, 5 - Math.floor(investorAge / 15));

    // Calculate overall risk score (combination of preference and age)
    const riskToleranceScore =
      (riskPreferenceValue + ageBasedRiskTolerance) / 2;

    return funds.map((fund) => {
      // Convert fund risk level to a numeric value
      const fundRiskValue =
        fund.riskLevel === "very-high"
          ? 5
          : fund.riskLevel === "high"
          ? 4
          : fund.riskLevel === "moderate"
          ? 3
          : fund.riskLevel === "low"
          ? 2
          : 1;

      // Calculate how well the fund's risk matches the investor's tolerance
      const riskMatchScore =
        10 - Math.abs(fundRiskValue - riskToleranceScore) * 2;

      // Calculate return scores based on investment horizon
      let returnScore;
      if (investmentHorizon <= 2) {
        // Short-term: 1Y return is most important
        returnScore = fund.returns["1Y"] / 2;
      } else if (investmentHorizon <= 5) {
        // Medium-term: 3Y return is most important
        returnScore = fund.returns["3Y"] / 2;
      } else {
        // Long-term: 5Y return is most important
        returnScore = fund.returns["5Y"] / 2;
      }

      // Calculate expense ratio score (lower is better)
      const expenseRatioScore = 10 - fund.expenseRatio * 2;

      // Calculate category match score based on age and investment horizon
      let categoryMatchScore = 5;
      if (investorAge > 60) {
        // Older investors: prefer debt and low risk
        categoryMatchScore = fund.category.includes("debt")
          ? 10
          : fund.category === "hybrid"
          ? 7
          : 3;
      } else if (investorAge > 40) {
        // Middle-aged: prefer balance
        categoryMatchScore =
          fund.category === "hybrid"
            ? 10
            : fund.category === "multi-cap"
            ? 8
            : 5;
      } else {
        // Younger: prefer equity for growth
        categoryMatchScore = fund.category.includes("cap")
          ? 10
          : fund.category === "elss"
          ? 9
          : fund.category === "hybrid"
          ? 7
          : 4;
      }

      // Calculate overall score
      const score =
        riskMatchScore * 0.3 +
        returnScore * 0.3 +
        expenseRatioScore * 0.2 +
        categoryMatchScore * 0.2;

      // Determine which aspects make this fund a good choice
      const isGoodRiskMatch = riskMatchScore > 7;
      const isGoodExpenseRatio = expenseRatioScore > 7;
      const isGoodCategoryMatch = categoryMatchScore > 7;

      // Determine which timeframe returns are best for this fund
      let isGoodShortTerm = false;
      let isGoodMidTerm = false;
      let isGoodLongTerm = false;

      if (investmentHorizon <= 2) {
        isGoodShortTerm = fund.returns["1Y"] > 10;
      } else if (investmentHorizon <= 5) {
        isGoodMidTerm = fund.returns["3Y"] > 12;
      } else {
        isGoodLongTerm = fund.returns["5Y"] > 14;
      }

      return {
        fund: fund,
        score: score,
        riskMatch: isGoodRiskMatch,
        lowExpense: isGoodExpenseRatio,
        categoryMatch: isGoodCategoryMatch,
        shortTermReturns: isGoodShortTerm,
        midTermReturns: isGoodMidTerm,
        longTermReturns: isGoodLongTerm,
      };
    });
  }

  /**
   * Calculate projected return for a fund based on investment horizon
   */
  function calculateProjectedReturn(fund, investmentHorizon) {
    let baseReturn;

    // Use the most relevant return metric based on investment horizon
    if (investmentHorizon <= 2) {
      baseReturn = fund.returns["1Y"];
    } else if (investmentHorizon <= 5) {
      baseReturn = fund.returns["3Y"];
    } else {
      baseReturn = fund.returns["5Y"];
    }

    // Apply a regression factor (returns tend to normalize over time)
    const regressionFactor = 0.9 + (0.1 * Math.min(investmentHorizon, 10)) / 10;

    // Account for expense ratio drag over time
    const expenseRatioDrag = fund.expenseRatio * (1 - 1 / investmentHorizon);

    // Calculate projected return
    let projectedReturn = baseReturn * regressionFactor - expenseRatioDrag;

    // Apply risk adjustment
    const riskAdjustment =
      fund.riskLevel === "very-high"
        ? 2
        : fund.riskLevel === "high"
        ? 1
        : fund.riskLevel === "moderate"
        ? 0
        : fund.riskLevel === "low"
        ? -0.5
        : -1;

    projectedReturn += riskAdjustment;

    // Ensure the return is within reasonable bounds
    return Math.max(1, Math.min(30, projectedReturn));
  }

  function exportScreenerResults() {
    const table = document.getElementById("screener-table");
    const rows = Array.from(table.querySelectorAll("tr"));

    let csv = [];
    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("th, td"));
      const rowData = cells.map((cell) => {
        // Remove HTML and clean the text
        return `"${cell.textContent.trim().replace(/"/g, '""')}"`;
      });
      csv.push(rowData.join(","));
    });

    const csvContent = csv.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "fund_screener_results.csv";
    link.click();
  }

  function saveScreenerSettings() {
    const settings = {
      categories: Array.from(
        document.getElementById("fund-category").selectedOptions
      ).map((opt) => opt.value),
      minRating: document.getElementById("min-rating").value,
      minAUM: document.getElementById("min-aum").value,
      returns: {
        "1Y": document.getElementById("return-1y").value,
        "3Y": document.getElementById("return-3y").value,
        "5Y": document.getElementById("return-5y").value,
      },
      riskLevels: Array.from(
        document.getElementById("risk-level").selectedOptions
      ).map((opt) => opt.value),
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("fundScreenerSettings", JSON.stringify(settings));

    // Show confirmation to user
    alert("Fund Screener settings saved successfully!");

    // Optional: Create a UI element for better UX instead of an alert
    // const notification = document.createElement('div');
    // notification.className = 'notification success';
    // notification.textContent = 'Fund Screener settings saved successfully!';
    // document.body.appendChild(notification);
    // setTimeout(() => notification.remove(), 3000);
  }
});
