import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useRef } from 'react'; // Import tools
import confetti from 'canvas-confetti';
import './App.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedDateKey, setSelectedDateKey] = useState(null);
  const [newEventText, setNewEventText] = useState("");

  // Load events from LocalStorage
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendar-events");
    return saved ? JSON.parse(saved) : {};
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const firstDayIndex = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const lastDate = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: lastDate }, (_, i) => i + 1);
  const blanks = Array.from({ length: adjustedFirstDay }, (_, i) => i);

  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const openModal = (e, day) => {
    e.stopPropagation(); // Prevents triggering other clicks
    setSelectedDateKey(`${year}-${month}-${day}`);
    setShowModal(true);
  };

  const handleAddEvent = () => {
    if (newEventText.trim()) {
      setEvents({
        ...events,
        [selectedDateKey]: [...(events[selectedDateKey] || []), newEventText.trim()]
      });
      setNewEventText("");
      setShowModal(false);
    }
  };

  const deleteEvent = (e, dateKey, index) => {
    e.stopPropagation();
    const updated = events[dateKey].filter((_, i) => i !== index);
    setEvents({ ...events, [dateKey]: updated });
  };

  return (
    <div className='calendar'>
      <header>
        <button className="prevMonthButton" onClick={prevMonth}><FontAwesomeIcon icon={faArrowLeft} /></button>
        <h2 className="monthYear">{monthName} {year}</h2>
        <button className="nextMonthButton" onClick={nextMonth}><FontAwesomeIcon icon={faArrowRight} /></button>
      </header>
      
      <div className="day-names">
        <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
      </div>

      <div className="days">
        {blanks.map((b) => <div key={`blank-${b}`} className="empty"></div>)}
        
        {daysArray.map((day) => {
          const dateKey = `${year}-${month}-${day}`;
          const isToday = day === new Date().getDate() && 
                          month === new Date().getMonth() && 
                          year === new Date().getFullYear();
          const hasEvent = events[dateKey] && events[dateKey].length > 0;

          return (
            <div 
              key={day} 
              className={`day-cell ${isToday ? "today" : ""} ${hasEvent ? "has-event" : ""}`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              <span className="day-number">{day}</span>
              
              {hoveredDay === day && (
                <button className="add-event-btn" onClick={(e) => openModal(e, day)}>+</button>
              )}

              {/* Show events on hover */}
              {hasEvent && hoveredDay === day && (
                <div className="event-popup">
                  {events[dateKey].map((ev, i) => (
                    <div key={i} className="event-tag" onClick={(e) => deleteEvent(e, dateKey, i)}>
                      {ev}
                    </div>
                  ))}
                  <p className="delete-hint">Click tag to remove</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add an Event ✨</h3>
            <input 
              type="text" 
              placeholder="Exam name or note..." 
              value={newEventText}
              onChange={(e) => setNewEventText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddEvent()}
              autoFocus
            />
            <div className="modal-btns">
              <button className="save-btn" onClick={handleAddEvent}>Add</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Music({ audioRef, isPlaying, toggleMusic }){
  return (
    <div className="music-section">
        {/* The hidden audio player */}
        <audio 
          ref={audioRef} 
          src={`${process.env.PUBLIC_URL}/lofi_music_for_project.mp3`}
          loop 
        />

        <button className="music-toggle" onClick={toggleMusic}>
          {isPlaying ? "⏸ Pause Beats" : "🐧 Play Lofi"}
        </button>
        
        {isPlaying && <p className="music-note">♪ Currently vibing... ♪</p>}
      </div>
  );
}

function App() {
  // Create a "state" variable for time
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-GB', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  }));
  // This is like a "while(true)" loop but for browsers
  useEffect(() => {
    const timer = setInterval(() => {
      // This line was missing the 24h formatting logic!
      setTime(new Date().toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
      }));
    }, 1000);
    return () => clearInterval(timer); 
  }, []);

  // mood tracker
  const [mood, setMood] = useState("Neutral");

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("my-cozy-tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState(""); // Like a temporary string
  const addTask = () => {
    if (inputValue.trim() !== "") {
      // In React, we don't use .push(). We create a NEW array.
      // The ...tasks syntax "spreads" the old tasks into the new array.
      setTasks([...tasks, inputValue]); 
      setInputValue(""); // Clear the input box
    }
  };
  const deleteTask = (indexToDelete) => {
    // We filter the array: keep every task EXCEPT the one at this index
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Check if tasks were just finished (length is 0)
    // We also check if we actually had tasks to begin with so it doesn't fire on page load
    if (tasks.length === 0 && localStorage.getItem("my-cozy-tasks") !== "[]") {
      
      // The "Firework" effect
      const duration = 3 * 1000; // 3 seconds
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // we launch from random spots
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
    // Converts the array to a JSON string and saves it
    localStorage.setItem("my-cozy-tasks", JSON.stringify(tasks));
  }, [tasks]); // This effect runs every time the tasks array changes

  const quotes = [
    "Take a deep breath. You're doing great. ✨",
    "Progress is progress, no matter how small. ☁️",
    "It's a beautiful day to learn something new. 📖",
    "Stay cozy and keep going. ☕",
    "You deserve a break and a warm drink. 🌙",
    "Small steps lead to big changes. 🌿",
    "Your pace is just right. Don't rush. 🐢",
    "Focus on the step, not the mountain. 🏔️",
    "Be gentle with yourself today. 🧸",
    "Consistency is your superpower. ⚡",
    "Even the sun needs to set to rise again. 🌅",
    "Bloom at your own speed. 🌸",
    "A little rest goes a long way. 🕯️",
    "Mistakes are just proof that you're trying. 🎨",
    "Growth is often quiet. Keep going. 🎧",
    "Softness is a strength, not a weakness. ☁️",
    "The stars can't shine without darkness. ✨",
    "Done is better than perfect. ✅",
    "Today is a fresh canvas. Paint it well. 🖌️",
    "You’ve done enough for today. Sleep well. 💤",
    "Deep work, quiet mind. 🧠",
    "Let go of what you cannot control. 🍃",
    "Radiate the energy you want to receive. ☀️",
    "Quiet moments are where the magic happens. 🌙",
    "Your potential is infinite. 🌌",
    "Success is a series of small wins. 🏆",
    "Disconnect to reconnect with yourself. 🔌",
    "Fuel your focus with kindness. ☕"
  ];
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  // Function to pick a new random quote
  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null); // Our "pointer" to the audio element
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Initialize from local storage so it remembers your choice!
  const [isNight, setIsNight] = useState(() => {
    return localStorage.getItem("theme") === "night";
  });

  // Save the choice whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", isNight ? "night" : "day");
  }, [isNight]);

  return (
    <div className={isNight ? "App night-mode" : "App day-mode"}>
      <div className="quote-section">
        <p className="quote-text">"{currentQuote}"</p>
        <button className="quote-btn" onClick={generateQuote}>New Wisdom ✨</button>
      </div>
      <button className="theme-toggle" onClick={() => setIsNight(!isNight)}>
        {isNight ? "🌙 Night Mode" : "☀️ Day Mode"}
      </button>
      
      <div className="main-panel">
        <Calendar />
        <div className="mood-container">
          <h1>Hi there!:3</h1>
          <h2 className="clock-text">{time}</h2>
          <div className="mood-selector">
            <p>How are you feeling?</p>
            <button className="Moody" onClick={() => setMood("Moody ☁️")}>☁️</button>
            <button className="Productive" onClick={() => setMood("Productive ✨")}>✨</button>
            <button className="Sleepy" onClick={() => setMood("Sleepy 🌙")}>🌙</button>
          </div>
          <div className="mood-display">
            Current Vibe: <strong>{mood}</strong>
          </div>
        </div>

        <div className="glass-card">
          <p>What are we working on today?</p>
          <div className="todo-section">
            <h3>Winter Goals ❄️</h3>
            
            <div className="todo-input">
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Type a task..."
              />
              <button onClick={addTask}>Add</button>
            </div>
            <ul className="todo-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  <span>{task}</span>
                  <button className="delete-btn" onClick={() => deleteTask(index)}>
                    Done ✨
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Music 
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        toggleMusic={toggleMusic}
      />
    </div>
  );
}

export default App;