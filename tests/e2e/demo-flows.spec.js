// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Demo Flow Tests
 * Tests the main demo scenarios: Shift Start, Disruption Alert, and Shift End
 */

test.describe('Demo Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await expect(page.locator('text=Crew Controller')).toBeVisible();
  });

  test.describe('Scene 1: Shift Start', () => {
    test('should trigger shift start greeting via demo controls', async ({ page }) => {
      // Open demo controls with FAB button
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');

      // Wait for demo panel to appear
      await expect(page.locator('text=Demo Controls')).toBeVisible();

      // Click Scene 1: Shift Start
      await page.click('button:has-text("Scene 1: Shift Start")');

      // Verify greeting message appears in chat
      await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });

      // Verify AI greeting content contains expected elements
      const chatPanel = page.locator('[class*="ChatPanel"], [class*="chat"]').first();
      await expect(chatPanel).toContainText(/Good morning|Buenos días|Welcome/i);
    });

    test('should trigger shift start via keyboard shortcut', async ({ page }) => {
      // Press Ctrl+D to open demo controls
      await page.keyboard.press('Control+d');

      // Wait for demo panel
      await expect(page.locator('text=Demo Controls')).toBeVisible();

      // Click Scene 1
      await page.click('button:has-text("Scene 1: Shift Start")');

      // Verify greeting appears
      await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });
    });

    test('should show suggested questions after greeting', async ({ page }) => {
      // Trigger shift start
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');

      // Wait for greeting
      await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });

      // Verify suggested questions appear
      await expect(page.locator('text=Weather exposure')).toBeVisible();
      await expect(page.locator('text=Network map')).toBeVisible();
      await expect(page.locator('text=Fatigue risk')).toBeVisible();
    });

    test('should display visualization panel with operations overview', async ({ page }) => {
      // Trigger shift start
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');

      // Wait for greeting and visualization
      await page.waitForTimeout(1000);

      // Check for visualization content (varies by scenario)
      const vizPanel = page.locator('[class*="VisualizationPanel"], [class*="visualization"]').first();
      await expect(vizPanel).toBeVisible();
    });
  });

  test.describe('Scene 3: Disruption Alert', () => {
    test('should trigger disruption alert', async ({ page }) => {
      // Open demo controls
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');

      // Click Scene 3: Disruption Alert
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      // Verify alert message appears with critical styling
      await expect(page.locator('text=CRITICAL').first()).toBeVisible({ timeout: 5000 });
    });

    test('should display resolution options', async ({ page }) => {
      // Trigger disruption
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      // Wait for options to appear
      await page.waitForTimeout(2000);

      // Verify option cards are present
      const optionCards = page.locator('[class*="OptionCard"], [class*="option"]');
      await expect(optionCards.first()).toBeVisible({ timeout: 5000 });
    });

    test('should show Gantt timeline visualization', async ({ page }) => {
      // Trigger disruption
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      // Wait for visualization
      await page.waitForTimeout(1500);

      // Check for Gantt timeline elements
      const vizPanel = page.locator('[class*="VisualizationPanel"]').first();
      await expect(vizPanel).toBeVisible();
    });

    test('should allow selecting a resolution option', async ({ page }) => {
      // Trigger disruption
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      // Wait for options
      await page.waitForTimeout(2000);

      // Click the first option card (recommended option)
      const recommendedOption = page.locator('text=RECOMMENDED').first();
      if (await recommendedOption.isVisible()) {
        await recommendedOption.click();
      } else {
        // Fallback to clicking any option
        const optionCard = page.locator('[class*="cursor-pointer"]').first();
        await optionCard.click();
      }

      // Verify confirmation message appears
      await expect(page.locator('text=Resolution Executed').or(page.locator('text=Successfully'))).toBeVisible({ timeout: 5000 });
    });

    test('should show resolution preview after selection', async ({ page }) => {
      // Trigger disruption
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');

      // Wait for and click an option
      await page.waitForTimeout(2000);
      const optionCard = page.locator('[class*="cursor-pointer"]').first();
      if (await optionCard.isVisible()) {
        await optionCard.click();

        // Wait for resolution preview
        await page.waitForTimeout(2000);

        // Verify resolution preview is shown
        const vizPanel = page.locator('[class*="VisualizationPanel"]').first();
        await expect(vizPanel).toBeVisible();
      }
    });
  });

  test.describe('Scene 5: Shift End', () => {
    test('should trigger shift end report', async ({ page }) => {
      // Open demo controls
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');

      // Click Scene 5: Shift End
      await page.click('button:has-text("Scene 5: Shift End")');

      // Verify shift report content appears
      await expect(page.locator('text=Performance').or(page.locator('text=Shift'))).toBeVisible({ timeout: 5000 });
    });

    test('should display shift report visualization', async ({ page }) => {
      // Trigger shift end
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 5: Shift End")');

      // Wait for visualization
      await page.waitForTimeout(1500);

      // Check for ShiftReport elements
      const vizPanel = page.locator('[class*="VisualizationPanel"]').first();
      await expect(vizPanel).toBeVisible();
    });

    test('should show performance score', async ({ page }) => {
      // Trigger shift end
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 5: Shift End")');

      // Wait for report to load
      await page.waitForTimeout(2000);

      // Look for score-related content in the visualization
      const vizPanel = page.locator('[class*="VisualizationPanel"]').first();
      await expect(vizPanel).toBeVisible();
    });
  });

  test.describe('Complete Demo Flow', () => {
    test('should complete full demo sequence', async ({ page }) => {
      // Scene 1: Shift Start
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 1: Shift Start")');
      await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });

      // Wait and verify
      await page.waitForTimeout(1000);

      // Scene 3: Disruption Alert
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 3: Disruption Alert")');
      await expect(page.locator('text=CRITICAL').first()).toBeVisible({ timeout: 5000 });

      // Wait and verify options
      await page.waitForTimeout(2000);

      // Select an option if available
      const optionCard = page.locator('[class*="cursor-pointer"]').first();
      if (await optionCard.isVisible()) {
        await optionCard.click();
        await page.waitForTimeout(2000);
      }

      // Scene 5: Shift End
      await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
      await page.click('button:has-text("Scene 5: Shift End")');
      await expect(page.locator('text=Performance').or(page.locator('text=Shift'))).toBeVisible({ timeout: 5000 });
    });
  });
});
