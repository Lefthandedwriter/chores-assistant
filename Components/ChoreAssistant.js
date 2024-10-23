import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, RefreshCw, Calendar } from 'lucide-react';

const ChoresAssistant = () => {
  const getSeasonalTasks = (month) => {
    const seasons = {
      winter: [
        "Check heating system filters",
        "Inspect roof for ice dams",
        "Test smoke/CO detectors",
        "Winterize outdoor faucets",
        "Check window seals for drafts",
        "Inspect attic insulation",
        "Clean humidifier/dehumidifier",
        "Check pipe insulation",
        "Test sump pump",
        "Clean dryer vent",
        "Reverse ceiling fans",
        "Check emergency supplies",
        "Clean fireplace/chimney",
        "Inspect weather stripping",
        "Service snow removal equipment"
      ],
      spring: [
        "Clean gutters",
        "Check AC system",
        "Prepare garden beds",
        "Power wash exterior",
        "Service lawn equipment",
        "Check window screens",
        "Clean outdoor lighting",
        "Inspect roof shingles",
        "Test irrigation system",
        "Fertilize lawn",
        "Clean patio furniture",
        "Check exterior paint",
        "Trim trees/shrubs",
        "Clean bird feeders",
        "Inspect foundation vents"
      ],
      summer: [
        "Check sprinkler system",
        "Clean outdoor furniture",
        "Service AC unit",
        "Inspect deck/patio",
        "Clean outdoor grill",
        "Check pool chemistry",
        "Inspect garden hoses",
        "Clean window screens",
        "Check door alignments",
        "Inspect outdoor plumbing",
        "Clean outdoor trash areas",
        "Check garden soil",
        "Maintain compost bin",
        "Clean outdoor fans",
        "Check garden lighting"
      ],
      fall: [
        "Clean gutters again",
        "Rake leaves",
        "Winterize garden",
        "Schedule heating maintenance",
        "Clean chimney",
        "Store outdoor furniture",
        "Drain outdoor faucets",
        "Check roof condition",
        "Clean window wells",
        "Seal driveway",
        "Aerate lawn",
        "Clean outdoor drainage",
        "Store garden hoses",
        "Check weatherstripping",
        "Inspect attic ventilation"
      ]
    };

    if (month >= 12 || month <= 2) return seasons.winter;
    if (month >= 3 && month <= 5) return seasons.spring;
    if (month >= 6 && month <= 8) return seasons.summer;
    return seasons.fall;
  };

  const initialTasks = {
    daily: [
      "Make beds",
      "Quick kitchen cleanup",
      "Wipe bathroom surfaces",
      "10-minute pickup round"
    ],
    weekly: [
      "Vacuum all floors",
      "Clean bathroom thoroughly"
    ],
    monthly: [
      "Deep clean appliances",
      "Dust ceiling fans/vents"
    ]
  };

  const taskOptions = {
    daily: [
      // Kitchen Tasks
      "Wipe kitchen counters and stovetop",
      "Empty/load dishwasher",
      "Clean sink and faucet",
      "Sweep kitchen floor",
      "Take out trash/recycling",
      "Wipe down table after meals",
      "Clean coffee maker",
      "Put away dishes",
      
      // Bathroom Tasks
      "Quick bathroom wipe-down",
      "Clean toilet",
      "Hang towels to dry",
      "Empty bathroom trash",
      
      // General Cleaning
      "Make beds",
      "10-minute declutter",
      "Wipe doorknobs and light switches",
      "Quick vacuum high-traffic areas",
      "Sort mail/papers",
      "Clean cat litter box",
      "Water plants",
      "Wipe mirrors",
      
      // Laundry/Clothing
      "Start one load of laundry",
      "Fold and put away clean clothes",
      "Pick up clothes/shoes",
      "Check washing machine seal",
      
      // Entry/Exit Areas
      "Sweep entryway",
      "Organize shoes",
      "Clean door mats",
      "Wipe down front door"
    ],
    
    weekly: [
      // Deep Cleaning
      "Vacuum all floors thoroughly",
      "Mop all hard floors",
      "Deep clean bathrooms",
      "Clean shower doors/curtain",
      "Dust all surfaces",
      "Clean mirrors and windows",
      "Vacuum upholstered furniture",
      "Clean baseboards in one room",
      
      // Kitchen
      "Clean microwave inside and out",
      "Wipe cabinet fronts",
      "Clean refrigerator shelves",
      "Sanitize garbage disposal",
      "Clean range hood filter",
      "Organize one drawer/cabinet",
      
      // Laundry
      "Change bed linens",
      "Wash bath mats",
      "Wash hand towels",
      "Clean washing machine",
      
      // Maintenance
      "Check smoke detectors",
      "Water house plants thoroughly",
      "Clean pet beds",
      "Vacuum air vents",
      "Clean computer keyboards",
      "Sanitize door handles",
      "Clean light switches",
      "Wash indoor trash cans"
    ],
    
    monthly: [
      // Deep Cleaning
      "Dust ceiling fans",
      "Clean window tracks",
      "Wash windows inside",
      "Clean light fixtures",
      "Vacuum mattresses",
      "Clean curtains/blinds",
      "Deep clean grout",
      "Clean underneath furniture",
      
      // Kitchen
      "Deep clean oven",
      "Deep clean refrigerator",
      "Clean small appliances",
      "Descale coffee maker",
      "Clean dishwasher filter",
      "Organize pantry",
      "Clean cabinet tops",
      
      // Bathroom
      "Deep clean shower head",
      "Clean bathroom exhaust fan",
      "Check/replace shower liner",
      "Clean bathroom scales",
      
      // Maintenance
      "Check HVAC filters",
      "Clean dryer vent",
      "Check water softener",
      "Clean vacuum filters",
      "Test garage door sensors",
      "Check fire extinguishers",
      "Clean door frames",
      "Dust high shelves/moldings",
      
      // Organization
      "Rotate seasonal items",
      "Clean/organize closet",
      "Sort through paperwork",
      "Check emergency supplies",
      "Organize under sink areas",
      "Clean laundry area"
    ]
  };

  const loadSavedState = () => {
    const saved = localStorage.getItem('choresState');
    if (saved) {
      const { date, savedTasks } = JSON.parse(saved);
      
      // Check if saved state is from today
      const savedDate = new Date(date);
      const today = new Date();
      if (savedDate.toDateString() === today.toDateString()) {
        return savedTasks;
      }
    }
    return null;
  };

  const initializeTasks = () => {
    const savedState = loadSavedState();
    if (savedState) {
      return savedState;
    }

    // If no saved state or it's a new day, create fresh tasks
    const today = new Date();
    const currentMonth = today.getMonth();
    const seasonalTasksList = getSeasonalTasks(currentMonth);

    return {
      daily: initialTasks.daily.map(task => ({ text: task, completed: false })),
      weekly: initialTasks.weekly.map(task => ({ text: task, completed: false })),
      monthly: initialTasks.monthly.map(task => ({ text: task, completed: false })),
      seasonal: seasonalTasksList.slice(0, 2).map(task => ({ text: task, completed: false }))
    };
  };

  const [tasks, setTasks] = useState(initializeTasks);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Save state whenever tasks change
  useEffect(() => {
    const saveState = () => {
      const state = {
        date: new Date().toISOString(),
        savedTasks: tasks
      };
      localStorage.setItem('choresState', JSON.stringify(state));
      setLastUpdated(new Date().toLocaleTimeString());
    };

    saveState();
  }, [tasks]);

  // Check for new day on app focus/resume
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const savedState = localStorage.getItem('choresState');
        if (savedState) {
          const { date } = JSON.parse(savedState);
          const savedDate = new Date(date);
          const today = new Date();
          
          if (savedDate.toDateString() !== today.toDateString()) {
            setTasks(initializeTasks());
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const toggleTask = (category, index) => {
    setTasks(prev => {
      const newTasks = { ...prev };
      newTasks[category] = [...prev[category]];
      newTasks[category][index] = {
        ...newTasks[category][index],
        completed: !newTasks[category][index].completed
      };
      return newTasks;
    });
  };

  const replaceTask = (category, index) => {
    const availableTasks = category === 'seasonal' 
      ? getSeasonalTasks(new Date().getMonth())
      : taskOptions[category];

    const currentTask = tasks[category][index].text;
    const filteredTasks = availableTasks.filter(task => 
      !tasks[category].some(t => t.text === task) && task !== currentTask
    );
    
    if (filteredTasks.length === 0) return;

    const randomTask = filteredTasks[Math.floor(Math.random() * filteredTasks.length)];
    
    setTasks(prev => {
      const newTasks = { ...prev };
      newTasks[category] = [...prev[category]];
      newTasks[category][index] = { text: randomTask, completed: false };
      return newTasks;
    });
  };

  const renderTasks = (category, title) => {
    const sortedTasks = [...tasks[category]].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });

    return (
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="space-y-2">
          {sortedTasks.map((task, index) => (
            <div 
              key={task.text} 
              className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <button
                onClick={() => toggleTask(category, index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full border 
                  ${task.completed 
                    ? 'bg-green-500 border-green-600 text-white' 
                    : 'border-gray-300 hover:border-gray-400'
                  } touch-manipulation`}
              >
                {task.completed && <Check className="w-5 h-5" />}
              </button>
              <span className={`flex-1 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
              <button
                onClick={() => replaceTask(category, index)}
                className="p-2 hover:bg-gray-200 rounded-full touch-manipulation"
                title="Replace task"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Today's Chores</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date().toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-500 mb-4">
          Last updated: {lastUpdated}
        </div>
        {renderTasks('daily', 'Daily Tasks')}
        {renderTasks('weekly', 'Weekly Tasks')}
        {renderTasks('monthly', 'Monthly Tasks')}
        {renderTasks('seasonal', 'Seasonal Tasks')}
      </CardContent>
    </Card>
  );
};

export default ChoresAssistant;
