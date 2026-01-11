let selected = {
    coins: false,
    gp: false,
    admin: false
};

function goToSection2() {
    const id = document.getElementById("userId").value.trim();
    selected.coins = document.getElementById("coins").checked;
    selected.gp = document.getElementById("gp").checked;
    selected.admin = document.getElementById("admin").checked;

    if (!id) {
        alert("Enter your ID");
        return;
    }

    if (!selected.coins && !selected.gp && !selected.admin) {
        alert("Select at least one option");
        return;
    }

    showSection(2);
    startCounters();
}

function showSection(num) {
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
    document.getElementById(`section${num}`).classList.add("active");
}

function startCounters() {
    let coinsTarget = selected.coins ? 25000 : 0;
    let gpTarget = selected.gp ? 25000 : 0;

    let finished = 0;

    if (coinsTarget > 0) {
        animateCounter("coinsCounter", coinsTarget, checkFinished);
    } else {
        document.getElementById("coinsCounter").textContent = "0";
        finished++;
    }

    if (gpTarget > 0) {
        animateCounter("gpCounter", gpTarget, checkFinished);
    } else {
        document.getElementById("gpCounter").textContent = "0";
        finished++;
    }

    function checkFinished() {
        finished++;
        if (finished === 2) {
            setTimeout(showResult, 900);
        }
    }
}

function animateCounter(id, target, callback) {
    let count = 0;
    let step = Math.ceil(target / 60);
    const el = document.getElementById(id);

    const interval = setInterval(() => {
        count += step;
        if (count >= target) {
            count = target;
            clearInterval(interval);
            if (callback) callback();
        }
        el.textContent = count.toLocaleString();
    }, 30);
}

function showResult() {
    showSection(3);

    let rewards = [];
    if (selected.coins) rewards.push("25,000 Coins");
    if (selected.gp) rewards.push("25,000 GP");
    if (selected.admin) rewards.push("Admin Access");

    document.getElementById("resultText").innerText =
        `Has recibido: ${rewards.join(", ")}`;
}
