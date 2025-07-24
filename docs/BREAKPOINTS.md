# Streamlined Co. - CSS Breakpoints Documentation

## Overview
This document outlines all CSS breakpoints used in the Streamlined Co. homepage animation system.

## Mobile-First Breakpoints (Default)

### Base Mobile (< 600px height, < 768px width)
- **Header**: 100vh initially → shrinks to `calc(100vh - 300px)`
- **Services**: 300px height
- **Font sizes**:
  - Main text: 32px
  - Tagline: 24px → 24px (no change)
- **Padding**:
  - Service: 15px
  - Service-inner: 5px
  - Gap between number/text: 15px

### Small Height Screens (< 500px height)
- **Special behavior**: Services take full screen (100vh)
- **Header**: Hidden (opacity: 0, height: 0)
- **Use case**: Landscape phones, embedded views

## Height-Based Breakpoints

### Medium Height (600px - 700px)
```css
@media (min-height: 600px)
```
- **Services**: 400px
- **Header**: `calc(100vh - 400px)`
- **Min header height**: 150px
- **Font sizes**:
  - Tagline: 24px → 28px (animated)

### Tall Mobile (700px - 850px) 
```css
@media (min-height: 700px) and (max-width: 768px)
```
- **Services**: 450px (optimized for iPhone 14 Pro Max)
- **Header**: `calc(100vh - 450px)` = ~295px
- **Font sizes**:
  - Tagline: 24px → 30px (animated)
- **Service padding**: 12px 20px
- **Service-inner padding**: 10px
- **Gap between number/text**: 20px
- **Your iPhone hits this breakpoint**

### Extra Tall Mobile (850px+)
```css
@media (min-height: 850px) and (max-width: 768px)
```
- **Services**: 600px
- **Header**: `calc(100vh - 600px)`
- **Font sizes**:
  - Tagline: 24px → 32px (animated)

### Ultra Tall Screens (1000px+ height)
```css
@media (min-height: 1000px)
```
- **Services**: 50vh (percentage-based)
- **Use case**: Tablets in portrait, tall desktop monitors

## Width-Based Breakpoints

### Medium Screens (768px - 1199px)
```css
@media (min-width: 768px) and (max-width: 1199px)
```
- **Font sizes**:
  - Main text: 40px → 56px (animated)
  - Tagline: 40px → 48px (animated)
  - Service number: 80px
  - Service title: 36px
- **Services**: 450px height
- **Padding**: 30px 60px
- **Gap between number/text**: 50px

### Desktop (1200px+)
```css
@media (min-width: 1200px)
```
- **Font sizes**:
  - Main text: 48px → 72px (animated)
  - Tagline: 48px → 60px (animated)
  - Service number: 120px
  - Service title: 48px
- **Services**: 500px height
- **Header**: `calc(100vh - 500px)`
- **Padding**: 40px 80px
- **Service-inner padding**: 20px
- **Gap between number/text**: 50px

### Extra Large Screens (1400px+)
```css
@media (min-width: 1400px)
```
- **Services**: 600px height
- **Header**: `calc(100vh - 600px)`
- **Padding**: 60px 100px
- **Min service height**: 200px

## Key Behaviors

### Service Distribution
- Services use `flex: 1 1 33.333%` 
- Each service takes exactly 1/3 of container height
- Example: 450px container = 150px per service

### Animation Timeline
1. **0-2.1s**: Intro animations (greeting, tagline appear)
2. **2.1s**: Services start expanding, header starts shrinking
3. **2.9s**: Services fully expanded
4. **3.5s**: `services-complete` class added

### Safari/Mobile Considerations
- Uses `dvh` (dynamic viewport height) for mobile Safari
- Uses `-webkit-fill-available` as fallback
- Fixed positioning for services to ensure bottom anchoring

## Testing Your Breakpoint

Your iPhone 14 Pro Max (745px × 430px) hits:
- Width: Mobile (< 768px) ✓
- Height: 700px breakpoint ✓
- Result: 450px services, 295px header space

## Quick Reference

| Device Type | Services Height | Header Space | Key Breakpoint |
|------------|----------------|--------------|----------------|
| Small Mobile | 300px | Rest | Default |
| iPhone 14 Pro Max | 450px | 295px | 700px height |
| iPad Portrait | 600px | Rest | 850px height |
| Desktop | 500px | Rest | 1200px width |
| Large Desktop | 600px | Rest | 1400px width |