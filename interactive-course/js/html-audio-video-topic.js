// HTML Audio and Video Topic JavaScript
document.addEventListener('DOMContentLoaded', function () {
    initializeAudioVideoTopic();
});

function initializeAudioVideoTopic() {
    setupCustomAudioControls();
    setupCustomVideoControls();
    initializeQuiz();
    setupExerciseToggles();
    addEventListeners();
}

// Custom Audio Controls
function setupCustomAudioControls() {
    const audio = document.getElementById('customAudio');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const volumeControl = document.getElementById('volumeControl');
    const volumeDisplay = document.getElementById('volumeDisplay');

    if (!audio || !playBtn) return;

    // Play button
    playBtn.addEventListener('click', function () {
        audio.play().then(() => {
            updateAudioButtonStates('playing');
        }).catch(error => {
            console.error('Error playing audio:', error);
            showMessage('Error: Could not play audio. Please check your browser settings.', 'error');
        });
    });

    // Pause button
    pauseBtn.addEventListener('click', function () {
        audio.pause();
        updateAudioButtonStates('paused');
    });

    // Stop button
    stopBtn.addEventListener('click', function () {
        audio.pause();
        audio.currentTime = 0;
        updateAudioButtonStates('stopped');
    });

    // Volume control
    if (volumeControl) {
        volumeControl.addEventListener('input', function () {
            const volume = parseFloat(this.value);
            audio.volume = volume;
            if (volumeDisplay) {
                volumeDisplay.textContent = Math.round(volume * 100) + '%';
            }
        });

        // Initialize volume display
        audio.volume = 0.5;
        volumeControl.value = 0.5;
        if (volumeDisplay) {
            volumeDisplay.textContent = '50%';
        }
    }

    // Audio event listeners
    audio.addEventListener('play', () => updateAudioButtonStates('playing'));
    audio.addEventListener('pause', () => updateAudioButtonStates('paused'));
    audio.addEventListener('ended', () => updateAudioButtonStates('stopped'));

    audio.addEventListener('error', function (e) {
        console.error('Audio error:', e);
        showMessage('Audio failed to load. Please check the file path.', 'error');
    });
}

function updateAudioButtonStates(state) {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');

    if (!playBtn || !pauseBtn || !stopBtn) return;

    // Reset all states
    [playBtn, pauseBtn, stopBtn].forEach(btn => {
        btn.classList.remove('active');
        btn.disabled = false;
    });

    switch (state) {
        case 'playing':
            playBtn.disabled = true;
            pauseBtn.classList.add('active');
            break;
        case 'paused':
            pauseBtn.disabled = true;
            playBtn.classList.add('active');
            break;
        case 'stopped':
            stopBtn.disabled = true;
            playBtn.classList.add('active');
            break;
    }
}

// Custom Video Controls
function setupCustomVideoControls() {
    const video = document.getElementById('customVideo');
    const overlayPlayBtn = document.getElementById('overlayPlayBtn');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoPauseBtn = document.getElementById('videoPauseBtn');
    const videoMuteBtn = document.getElementById('videoMuteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressBar = document.getElementById('progressBar');
    const timeDisplay = document.getElementById('timeDisplay');

    if (!video) return;

    // Overlay play button
    if (overlayPlayBtn) {
        overlayPlayBtn.addEventListener('click', function () {
            playVideo();
            document.querySelector('.video-overlay').style.display = 'none';
        });
    }

    // Control buttons
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', playVideo);
    }

    if (videoPauseBtn) {
        videoPauseBtn.addEventListener('click', pauseVideo);
    }

    if (videoMuteBtn) {
        videoMuteBtn.addEventListener('click', toggleMute);
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Progress bar
    if (progressBar) {
        progressBar.addEventListener('input', function () {
            const seekTime = (this.value / 100) * video.duration;
            if (!isNaN(seekTime)) {
                video.currentTime = seekTime;
            }
        });
    }

    // Video event listeners
    video.addEventListener('loadedmetadata', function () {
        updateTimeDisplay();
        if (progressBar) {
            progressBar.value = 0;
        }
    });

    video.addEventListener('timeupdate', function () {
        updateProgress();
        updateTimeDisplay();
    });

    video.addEventListener('play', function () {
        updateVideoButtonStates('playing');
    });

    video.addEventListener('pause', function () {
        updateVideoButtonStates('paused');
    });

    video.addEventListener('ended', function () {
        updateVideoButtonStates('ended');
        if (document.querySelector('.video-overlay')) {
            document.querySelector('.video-overlay').style.display = 'flex';
        }
    });

    video.addEventListener('volumechange', function () {
        updateMuteButtonIcon();
    });

    video.addEventListener('error', function (e) {
        console.error('Video error:', e);
        showMessage('Video failed to load. Please check the file path.', 'error');
    });

    // Video control functions
    function playVideo() {
        video.play().catch(error => {
            console.error('Error playing video:', error);
            showMessage('Error: Could not play video. Please check your browser settings.', 'error');
        });
    }

    function pauseVideo() {
        video.pause();
    }

    function toggleMute() {
        video.muted = !video.muted;
        updateMuteButtonIcon();
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }

    function updateProgress() {
        if (progressBar && video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.value = progress;
        }
    }

    function updateTimeDisplay() {
        if (timeDisplay) {
            const current = formatTime(video.currentTime || 0);
            const duration = formatTime(video.duration || 0);
            timeDisplay.textContent = `${current} / ${duration}`;
        }
    }

    function updateVideoButtonStates(state) {
        const playBtn = document.getElementById('videoPlayBtn');
        const pauseBtn = document.getElementById('videoPauseBtn');

        if (!playBtn || !pauseBtn) return;

        // Reset states
        playBtn.classList.remove('active');
        pauseBtn.classList.remove('active');
        playBtn.disabled = false;
        pauseBtn.disabled = false;

        switch (state) {
            case 'playing':
                playBtn.disabled = true;
                pauseBtn.classList.add('active');
                break;
            case 'paused':
            case 'ended':
                pauseBtn.disabled = true;
                playBtn.classList.add('active');
                break;
        }
    }

    function updateMuteButtonIcon() {
        if (videoMuteBtn) {
            const icon = videoMuteBtn.querySelector('i');
            if (icon) {
                icon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        }
    }
}

// Utility function to format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Quiz functionality
function initializeQuiz() {
    const quizSubmit = document.querySelector('.quiz-submit');
    const quizRetry = document.querySelector('.quiz-retry');

    if (quizSubmit) {
        quizSubmit.addEventListener('click', checkQuizAnswers);
    }

    if (quizRetry) {
        quizRetry.addEventListener('click', resetQuiz);
    }
}

function checkQuizAnswers() {
    const answers = {
        q1: 'b', // controls
        q2: 'b', // to show an image before video loads
        q3: 'b'  // metadata
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    // Check each answer
    Object.keys(answers).forEach(questionId => {
        const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
        const questionElement = selectedAnswer ? selectedAnswer.closest('.quiz-question') : null;

        if (selectedAnswer && selectedAnswer.value === answers[questionId]) {
            score++;
            if (questionElement) {
                questionElement.classList.add('correct');
                questionElement.classList.remove('incorrect');
            }
        } else {
            if (questionElement) {
                questionElement.classList.add('incorrect');
                questionElement.classList.remove('correct');
            }
        }

        // Highlight correct answer
        const correctOption = document.querySelector(`input[name="${questionId}"][value="${answers[questionId]}"]`);
        if (correctOption) {
            correctOption.closest('li').classList.add('correct');
        }

        // Show incorrect selections
        if (selectedAnswer && selectedAnswer.value !== answers[questionId]) {
            selectedAnswer.closest('li').classList.add('incorrect');
        }
    });

    // Display results
    const percentage = Math.round((score / totalQuestions) * 100);
    document.getElementById('score').textContent = score;
    document.getElementById('percentage').textContent = percentage;

    document.querySelector('.quiz-results').style.display = 'block';
    document.querySelector('.quiz-submit').style.display = 'none';

    // Disable all inputs
    document.querySelectorAll('.quiz-question input').forEach(input => {
        input.disabled = true;
    });

    // Show feedback message
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excellent work! You have a strong understanding of HTML audio and video elements.';
    } else if (percentage >= 60) {
        message = '👍 Good job! Review the topics you missed and try again.';
    } else {
        message = '📚 Keep studying! Review the material and take the quiz again to improve your score.';
    }

    showMessage(message, percentage >= 80 ? 'success' : percentage >= 60 ? 'warning' : 'info');
}

function resetQuiz() {
    // Clear all selections and classes
    document.querySelectorAll('.quiz-question input').forEach(input => {
        input.checked = false;
        input.disabled = false;
    });

    document.querySelectorAll('.quiz-question').forEach(question => {
        question.classList.remove('correct', 'incorrect');
    });

    document.querySelectorAll('.quiz-options li').forEach(li => {
        li.classList.remove('correct', 'incorrect');
    });

    // Hide results and show submit button
    document.querySelector('.quiz-results').style.display = 'none';
    document.querySelector('.quiz-submit').style.display = 'block';
}

// Exercise toggles
function setupExerciseToggles() {
    document.querySelectorAll('.exercise-toggle').forEach(button => {
        button.addEventListener('click', function () {
            const solution = this.parentElement.querySelector('.exercise-solution');

            if (solution.style.display === 'none' || !solution.style.display) {
                solution.style.display = 'block';
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Solution';
                this.classList.add('active');
            } else {
                solution.style.display = 'none';
                this.innerHTML = '<i class="fas fa-code"></i> Show Solution';
                this.classList.remove('active');
            }
        });
    });
}

// Additional event listeners
function addEventListeners() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Copy functionality for code examples
    document.querySelectorAll('.code-example pre').forEach(pre => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy code';

        copyBtn.addEventListener('click', function () {
            const code = pre.textContent;
            navigator.clipboard.writeText(code).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                showMessage('Code copied to clipboard!', 'success');
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showMessage('Failed to copy code', 'error');
            });
        });

        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
    });

    // Format card interactions
    document.querySelectorAll('.format-card').forEach(card => {
        card.addEventListener('click', function () {
            const format = this.classList.contains('mp3') ? 'MP3' :
                this.classList.contains('mp4') ? 'MP4' :
                    this.classList.contains('webm') ? 'WebM' :
                        this.classList.contains('ogg') ? 'OGG' :
                            this.classList.contains('wav') ? 'WAV' :
                                this.classList.contains('ogg-video') ? 'OGV' : 'Unknown';

            showFormatInfo(format);
        });
    });

    // Practice card hover effects
    document.querySelectorAll('.practice-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Show format information
function showFormatInfo(format) {
    const formatInfo = {
        'MP3': 'MP3 (MPEG-1 Audio Layer III) is the most widely supported audio format across all browsers and devices. It offers good compression with acceptable quality loss.',
        'MP4': 'MP4 (MPEG-4 Part 14) is the most compatible video format, supported by all modern browsers. It uses H.264 video codec and AAC audio codec.',
        'WebM': 'WebM is an open, royalty-free media format designed for the web. It uses VP8/VP9 video codecs and Vorbis/Opus audio codecs.',
        'OGG': 'OGG is an open standard audio format that provides better compression than MP3. Supported by Firefox, Chrome, and Opera.',
        'WAV': 'WAV (Waveform Audio File Format) is an uncompressed audio format that provides high quality but large file sizes.',
        'OGV': 'OGV (Ogg Video) is an open standard video format using Theora video codec. Mainly supported by Firefox and older browsers.'
    };

    const info = formatInfo[format] || 'Format information not available.';
    showMessage(`${format}: ${info}`, 'info');
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    // Create or update message display
    let messageDiv = document.getElementById('globalMessage');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'globalMessage';
        messageDiv.className = 'global-message';
        document.body.appendChild(messageDiv);
    }

    messageDiv.textContent = message;
    messageDiv.className = `global-message ${type}`;
    messageDiv.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Add custom styles for interactive elements
function addAudioVideoStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .audio-demos,
        .video-demos {
            display: grid;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .demo-item {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            transition: all 0.3s ease;
        }
        
        .demo-item:hover {
            border-color: #3b82f6;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .demo-item h5 {
            color: #1f2937;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .demo-info {
            margin-top: 1rem;
            padding: 0.75rem;
            background: rgba(59, 130, 246, 0.05);
            border-left: 3px solid #3b82f6;
            border-radius: 4px;
            font-size: 0.9rem;
            color: #374151;
        }
        
        .custom-controls,
        .custom-video-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-top: 1rem;
            padding: 1rem;
            background: #f8fafc;
            border-radius: 6px;
            flex-wrap: wrap;
        }
        
        .custom-controls button,
        .custom-video-controls button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .custom-controls button:disabled,
        .custom-video-controls button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .custom-controls button.active,
        .custom-video-controls button.active {
            transform: scale(0.95);
        }
        
        .custom-video-container {
            position: relative;
            display: inline-block;
        }
        
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .play-overlay-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            font-size: 24px;
            color: #1f2937;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .play-overlay-btn:hover {
            background: white;
            transform: scale(1.1);
        }
        
        .progress-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex: 1;
        }
        
        .progress-container input[type="range"] {
            flex: 1;
        }
        
        .format-comparison {
            margin: 2rem 0;
        }
        
        .format-section {
            margin-bottom: 3rem;
        }
        
        .format-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }
        
        .format-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .format-card:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }
        
        .format-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        
        .format-header h4 {
            color: #1f2937;
            margin: 0;
        }
        
        .support-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
        }
        
        .support-badge.excellent {
            background: rgba(34, 197, 94, 0.1);
            color: #166534;
        }
        
        .support-badge.good {
            background: rgba(59, 130, 246, 0.1);
            color: #1e40af;
        }
        
        .support-badge.limited {
            background: rgba(245, 158, 11, 0.1);
            color: #d97706;
        }
        
        .format-details p {
            margin: 0.5rem 0;
            color: #6b7280;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .practice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        
        .practice-card {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            padding: 1.5rem;
            transition: all 0.3s ease;
        }
        
        .practice-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .practice-card h4 {
            color: #1f2937;
            margin-bottom: 0.75rem;
        }
        
        .practice-card ul {
            list-style: none;
            padding: 0;
        }
        
        .practice-card li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
            color: #6b7280;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .practice-card li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        
        .global-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            display: none;
            max-width: 400px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .global-message.success {
            background: #dcfce7;
            color: #166534;
            border-left: 4px solid #22c55e;
        }
        
        .global-message.error {
            background: #fef2f2;
            color: #991b1b;
            border-left: 4px solid #ef4444;
        }
        
        .global-message.warning {
            background: #fef3c7;
            color: #92400e;
            border-left: 4px solid #f59e0b;
        }
        
        .global-message.info {
            background: #dbeafe;
            color: #1e40af;
            border-left: 4px solid #3b82f6;
        }
        
        .copy-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .code-example pre:hover .copy-btn {
            opacity: 1;
        }
        
        .copy-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
            .custom-controls,
            .custom-video-controls {
                flex-direction: column;
                align-items: stretch;
            }
            
            .progress-container {
                flex-direction: column;
                align-items: stretch;
                gap: 0.5rem;
            }
            
            .global-message {
                position: relative;
                top: auto;
                right: auto;
                margin: 20px;
            }
            
            .format-grid,
            .practice-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize styles when page loads
document.addEventListener('DOMContentLoaded', addAudioVideoStyles);
