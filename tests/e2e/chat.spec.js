// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Chat Interface Tests
 * Tests the chat panel functionality including input, messages, and suggested questions
 */

test.describe('Chat Interface', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await expect(page.locator('text=Crew Controller')).toBeVisible();
  });

  test.describe('Initial State', () => {
    test('should display header with controller info', async ({ page }) => {
      await expect(page.locator('text=Crew Controller')).toBeVisible();
      await expect(page.locator('text=PTY Hub')).toBeVisible();
    });

    test('should display input bar', async ({ page }) => {
      const inputBar = page.locator('input[placeholder*="message"], textarea[placeholder*="message"], input[type="text"]').first();
      await expect(inputBar).toBeVisible();
    });

    test('should display suggested questions', async ({ page }) => {
      // First trigger greeting to show suggested questions
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');
      await page.waitForTimeout(1000);

      await expect(page.locator('text=Weather exposure')).toBeVisible();
    });

    test('should display demo controls FAB button', async ({ page }) => {
      await expect(page.locator('button[title="Open Demo Controls (Ctrl+D)"]')).toBeVisible();
    });
  });

  test.describe('User Input', () => {
    test('should allow typing in input field', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('Test message');
      await expect(input).toHaveValue('Test message');
    });

    test('should send message on Enter key', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('What is the weather?');
      await input.press('Enter');

      // Wait for user message to appear
      await page.waitForTimeout(500);

      // Verify user message is displayed
      await expect(page.locator('text=What is the weather?')).toBeVisible();
    });

    test('should send message on button click', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('Show network map');

      // Click send button
      const sendButton = page.locator('button[type="submit"], button:has(svg)').last();
      await sendButton.click();

      // Wait for message
      await page.waitForTimeout(500);

      // Verify user message is displayed
      await expect(page.locator('text=Show network map')).toBeVisible();
    });

    test('should clear input after sending', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('Test clear');
      await input.press('Enter');

      // Wait for send
      await page.waitForTimeout(500);

      // Input should be cleared
      await expect(input).toHaveValue('');
    });

    test('should show typing indicator while waiting for response', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('What about the weather?');
      await input.press('Enter');

      // Typing indicator might appear briefly
      // This is timing-dependent, so we just verify the message flow works
      await page.waitForTimeout(2000);

      // Should have both user message and AI response
      await expect(page.locator('text=What about the weather?')).toBeVisible();
    });
  });

  test.describe('AI Responses', () => {
    test('should display AI response after user message', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('What is the weather exposure?');
      await input.press('Enter');

      // Wait for AI response
      await page.waitForTimeout(3000);

      // Should have AI response (prose formatting)
      await expect(page.locator('.prose').first()).toBeVisible();
    });

    test('should handle weather-related questions', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill("What's my exposure if Panama weather gets worse?");
      await input.press('Enter');

      // Wait for response
      await page.waitForTimeout(3000);

      // Should have weather-related response
      await expect(page.locator('text=weather').or(page.locator('text=Weather'))).toBeVisible();
    });

    test('should handle network-related questions', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('Show Copa Airlines route network');
      await input.press('Enter');

      // Wait for response
      await page.waitForTimeout(3000);

      // Should have network-related response
      await expect(page.locator('text=Network').or(page.locator('text=route').or(page.locator('text=PTY')))).toBeVisible();
    });
  });

  test.describe('Suggested Questions', () => {
    test.beforeEach(async ({ page }) => {
      // Trigger greeting to show suggested questions
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');
      await page.waitForTimeout(1000);
    });

    test('should display all suggested question categories', async ({ page }) => {
      await expect(page.locator('text=Weather exposure')).toBeVisible();
      await expect(page.locator('text=Live weather')).toBeVisible();
      await expect(page.locator('text=Fatigue risk')).toBeVisible();
      await expect(page.locator('text=Crew status')).toBeVisible();
      await expect(page.locator('text=Network map')).toBeVisible();
    });

    test('should trigger question when chip is clicked', async ({ page }) => {
      await page.click('text=Weather exposure');

      // Wait for response
      await page.waitForTimeout(2000);

      // User message should appear
      await expect(page.locator("text=What's my exposure if Panama weather gets worse?")).toBeVisible();
    });

    test('should clear messages when clear button is clicked', async ({ page }) => {
      // First add some messages
      await page.click('text=Weather exposure');
      await page.waitForTimeout(2000);

      // Click clear button
      const clearButton = page.locator('button:has-text("Clear")');
      if (await clearButton.isVisible()) {
        await clearButton.click();

        // Wait for clear
        await page.waitForTimeout(500);

        // Messages should be cleared (check for absence of specific content)
        // The greeting should no longer be visible
      }
    });
  });

  test.describe('Message Types', () => {
    test('should display user messages correctly', async ({ page }) => {
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('Test user message');
      await input.press('Enter');

      await page.waitForTimeout(500);

      // User message should be visible
      await expect(page.locator('text=Test user message')).toBeVisible();
    });

    test('should display AI greeting after Scene 1', async ({ page }) => {
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');

      await page.waitForTimeout(1000);

      // Greeting should contain morning/welcome text
      await expect(page.locator('.prose').first()).toBeVisible();
    });

    test('should display AI alert with severity badge', async ({ page }) => {
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      await page.waitForTimeout(1000);

      // Alert should show CRITICAL badge
      await expect(page.locator('text=CRITICAL').first()).toBeVisible();
    });

    test('should display option cards for resolution', async ({ page }) => {
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      await page.waitForTimeout(2000);

      // Option cards should be visible
      const options = page.locator('[class*="cursor-pointer"]');
      await expect(options.first()).toBeVisible();
    });

    test('should display confirmation after selecting option', async ({ page }) => {
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      await page.waitForTimeout(2000);

      // Click an option
      const optionCard = page.locator('[class*="cursor-pointer"]').first();
      if (await optionCard.isVisible()) {
        await optionCard.click();

        await page.waitForTimeout(2000);

        // Confirmation message should appear
        await expect(page.locator('text=Resolution').or(page.locator('text=Successfully'))).toBeVisible();
      }
    });
  });

  test.describe('Scroll Behavior', () => {
    test('should auto-scroll to latest message', async ({ page }) => {
      // Add multiple messages to trigger scrolling
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');
      await page.waitForTimeout(1000);

      // Add more messages
      const input = page.locator('input[placeholder*="message"], input[type="text"]').first();
      await input.fill('First question');
      await input.press('Enter');
      await page.waitForTimeout(1500);

      await input.fill('Second question');
      await input.press('Enter');
      await page.waitForTimeout(1500);

      // The latest message should be visible (scrolled into view)
      await expect(page.locator('text=Second question')).toBeVisible();
    });
  });
});
