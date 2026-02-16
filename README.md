# ⏳ Time Left - Memento Mori

Time is a limited resource we spend with abandon.  This is a somber calculator for understanding how much time you have left with the people you love.

## An Uncomfortable, Sorrowful Truth

With parents who are 60:
- ~20 years remaining
- If you see them 2 days/month = 480 hours left
- That's **20 days of actual time**
- Less than 3 weeks

**You have less time than you think.**

This isn't morbid.  By confronting mortality honestly, we learn to cherish every moment.  Time is our most precious gift, and this tool helps us see how much we have left.

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

📥 **[BirdDay](https://github.com/m-i-n-a-r/birday) Import**
- Import birthdays from [BirdDay](https://github.com/m-i-n-a-r/birday) SQLite exports
- Bulk import multiple people at once
- Map each person to relationship type and time pattern
- Automatically adjusts timelines based on when you met
- *Thanks to the BirdDay project for making birthday tracking beautiful, simple, and private*

📝 **Scenario Templates** (15+ patterns)
- Traditional family (left home at 18)
- Strong family (living nearby)
- Homeschooled (exceptionally close)
- Parent elder care (moved back in)
- Estranged then reconciled
- Long distance relationship
- College friends, work colleagues
- Grandparents, siblings, children
- Distant family, foster care
- Custom (build your own)

💾 **Local Storage**
- All data stays on your computer
- No cloud, no tracking, no backend
- Privacy-first design
- BirdDay imports processed entirely in browser

🎨 **Reverent Aesthetic**
- Because reverence is underrated

## How to Use

### 1. Initial Setup
- Enter your birth year and birth month
- Select your sex--for life expectancy calculations

### 2. Add People

**Option A: Add Manually**
- Name and basic info
- Choose a scenario template
- Customize the timeline

**Option B: Import from BirdDay**
- Click "📥 Import from BirdDay"
- Upload your BirdDay export
- Review and map people to relationships
- Set YOUR age when you met each person
- Choose time patterns for each relationship
- Import selected people

### 3. View Calculations
- See years remaining in their life
- See *actual* time together 
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

## Example Scenarios

**Traditional Family:**
- 0-18: 12 hrs/day
- 18-25: 0.5 hrs/day
- 25+: 0.3 hrs/day 

**Homeschooled:**
- 0-22: 18 hrs/day
- 22+: 2 hrs/day 

**Foster Care:**
- 0-5: 8 hrs/day
- 5+: 0 hrs/day 

## Tech Stack

- React 19 + TypeScript + Vite
- Local storage for persistence
- SSA life expectancy data
- sql.js for BirdDay import (SQLite in browser)
- Zero backend, zero tracking
- If you run this locally it opens at **http://localhost:5175**


---

*Remember: This tool exists to help you live better, not to depress you. Use it as motivation to call your mother, visit your father, teach your children, and relish every moment with the people placed in your path.*
