const form = document.querySelector("form");
const amountInput = document.querySelector("input");
const fromCurrency = document.querySelector("select[name='From']");
const toCurrency = document.querySelector("select[name='To']");
const msgDiv = document.querySelector(".msg");
const fromImg = document.querySelector(".From img");
const toImg = document.querySelector(".To img");

// Function to get country code from currency
function getCountryCode(currency) {
    const countryCodes = {
        USD: "US",
        INR: "IN",
        EUR: "EU",
        AUD: "AU",
        GBP: "GB",
        JPY: "JP",
        CAD: "CA"
        // Add more as needed
    };
    return countryCodes[currency];
}

// Function to update flag
function updateFlag(selectElement, imgElement) {
    const currencyCode = selectElement.value;
    const countryCode = getCountryCode(currencyCode);
    if (countryCode) {
        imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
}

// Event listener for flag change
fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromImg));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toImg));

// Form submit handler
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        msgDiv.textContent = "Please enter a valid amount.";
        return;
    }

    if (from === to) {
        msgDiv.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rate = data.rates[to];
        msgDiv.textContent = `${amount} ${from} = ${rate} ${to}`;
    } catch (error) {
        msgDiv.textContent = "Error fetching exchange rate.";
        console.error(error);
    }
});

// Initial flag load
updateFlag(fromCurrency, fromImg);
updateFlag(toCurrency, toImg);
