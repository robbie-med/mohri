# ⏳ Time Left - Memento Mori

A somber calculator for understanding how much time you have left with the people you love.

## An Uncomfortable, Sorrowful Truth

With parents who are 60:
- ~20 years remaining
- If you see them 2 days/month = 480 hours left
- That's **20 days of actual time**
- Less than 3 weeks

**You have less time than you think.**

This isn't morbid.  By confronting mortality honestly, we learn to cherish every moment. Time is our most precious gift, and this tool helps us see how much we have left.

## What It Does

Calculate and visualize the time remaining with anyone in your life:
- **Parents** - How many years until they're gone?
- **Siblings** - How much time do you actually spend together?
- **Spouse** - How many hours remain in your lifetime together?
- **Friends** - How often do you really see them?
- **Children** - How much of their childhood is left?

## Features

✨ **Life Expectancy Calculations**
- Uses US Social Security Administration mortality tables
- Accounts for age and biological sex
- Shows years, months, weeks, days remaining

📊 **Percentage Tracking**
- Visual progress bars showing time spent vs. remaining
- Honest confrontation with mortality
- See how much has already passed

⏰ **Timeline Builder**
- Define different life periods (childhood, college, adulthood)
- Specify hours per day spent together
- Adjust for life changes and distance

📝 **Scenario Templates**
- Traditional family (left home at 18)
- Strong family (living nearby)
- Homeschooled (exceptionally close)
- Distant family
- Foster care / separated
- Spouses, siblings, friends
- Custom

💾 **Local Storage**
- All data stays on your computer
- No cloud, no tracking, no backend
- Privacy-first design

🎨 **Reverent Aesthetic**
- Because reverence is underrated

## Launch

**Desktop Shortcut:**
Double-click "Time Left" on your Desktop

**Command Line:**
```bash
/home/user/time-left/launch.sh
```

Opens at **http://localhost:5175**

## How to Use

### 1. Initial Setup
- Enter your birth year
- Select your sex (for life expectancy)

### 2. Add a Person
- Name and basic info
- Choose a scenario template
- Customize the timeline

### 3. View Calculations
- See years, days, hours remaining
- Understand what percentage has passed
- Confront the reality of finite time

### 4. Act Accordingly
- Call your parents
- Visit your grandparents
- Spend time with your spouse
- Don't waste another day

## The Math

**Time Remaining** = min(their years left, your years left) i.e. it's based on whoever dies first

**Hours Spent** = Σ (years in period × 365.25 × hours per day)

**Percentage Remaining** = hours left / total lifetime hours

## Scenarios

**Traditional Family:**
- 0-18: 12 hrs/day (living at home)
- 18-25: 0.5 hrs/day (college, holidays)
- 25+: 0.3 hrs/day (adult life)

**Homeschooled:**
- 0-22: 18 hrs/day (nearly constant)
- 22+: 2 hrs/day (maintained closeness)

**Foster Care:**
- 0-5: 8 hrs/day
- 5+: 0 hrs/day (separated)

## Tech Stack

- React 19 + TypeScript + Vite
- Local storage for persistence
- SSA life expectancy data
- Recharts for visualization
- Zero backend, zero tracking

---

*Remember: This tool exists to help you live better, not to depress you. Use it as motivation to call your mother, visit your father, teach your children, and relish every moment with the people placed in your path.*
