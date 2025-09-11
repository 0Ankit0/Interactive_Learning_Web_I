// Interactive Async/Await Demo & Quiz Logic

document.addEventListener('DOMContentLoaded', function () {
    // Live Async/Await Demo
    const fetchBtn = document.getElementById('fetchBtn');
    const apiUrlInput = document.getElementById('apiUrl');
    const apiResult = document.getElementById('apiResult');

    fetchBtn.addEventListener('click', async function () {
        const url = apiUrlInput.value.trim();
        apiResult.innerHTML = '<span class="loading">Loading...</span>';
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            apiResult.innerHTML = `<pre><code class="language-json">${JSON.stringify(data, null, 2)}</code></pre>`;
            Prism.highlightAll();
        } catch (error) {
            apiResult.innerHTML = `<span class="error">Error: ${error.message}</span>`;
        }
    });

    // Quiz Logic
    const quizSubmit = document.querySelector('.quiz-submit');
    const quizRetry = document.querySelector('.quiz-retry');
    const quizResults = document.querySelector('.quiz-results');
    const scoreSpan = document.getElementById('score');
    const percentageSpan = document.getElementById('percentage');

    quizSubmit.addEventListener('click', function () {
        let score = 0;
        // Answers: q1=a, q2=b, q3=a, q4=b
        if (document.querySelector('input[name="q1"]:checked')?.value === 'a') score++;
        if (document.querySelector('input[name="q2"]:checked')?.value === 'b') score++;
        if (document.querySelector('input[name="q3"]:checked')?.value === 'a') score++;
        if (document.querySelector('input[name="q4"]:checked')?.value === 'b') score++;
        scoreSpan.textContent = score;
        percentageSpan.textContent = Math.round((score / 4) * 100);
        quizResults.style.display = 'block';
        quizSubmit.style.display = 'none';
        quizRetry.style.display = 'inline-block';
    });

    quizRetry.addEventListener('click', function () {
        document.querySelectorAll('.quiz-options input[type="radio"]').forEach(input => input.checked = false);
        quizResults.style.display = 'none';
        quizSubmit.style.display = 'inline-block';
        quizRetry.style.display = 'none';
        scoreSpan.textContent = '0';
        percentageSpan.textContent = '0';
    });
});
