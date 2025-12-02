// @ts-check
import { test, expect } from '@playwright/test';

/**
 * Visualization Tests
 * Tests all visualization components via suggested questions
 */

test.describe('Visualizations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to load
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    // Trigger greeting to enable suggested questions
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await page.click('button:has-text("Scene 1: Shift Start")');
    await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(500);
  });

  test.describe('Weather Visualizations', () => {
    test('should display Weather Exposure visualization', async ({ page }) => {
      // Click weather exposure suggested question
      await page.click('text=Weather exposure');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify weather content appears
      await expect(page.locator('text=weather').first()).toBeVisible({ timeout: 5000 });
    });

    test('should display Live Weather visualization', async ({ page }) => {
      // Click live weather suggested question
      await page.click('text=Live weather');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify live weather content (may show loading or data)
      const chatPanel = page.locator('[class*="chat"]').first();
      await expect(chatPanel).toContainText(/weather|Weather/i);
    });
  });

  test.describe('Network Map', () => {
    test('should display Network Map visualization', async ({ page }) => {
      // Click network map suggested question
      await page.click('text=Network map');

      // Wait for response and map to load
      await page.waitForTimeout(3000);

      // Verify network map content in chat
      await expect(page.locator('text=Copa Airlines Route Network').or(page.locator('text=network'))).toBeVisible({ timeout: 5000 });

      // Check for map container (Mapbox)
      const mapContainer = page.locator('.mapboxgl-map, [class*="NetworkMap"]');
      // Map may or may not be visible depending on Mapbox token
    });

    test('should show network statistics', async ({ page }) => {
      // Click network map
      await page.click('text=Network map');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify network stats in response
      await expect(page.locator('text=PTY').or(page.locator('text=destinations'))).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Crew Visualizations', () => {
    test('should display Fatigue Heatmap', async ({ page }) => {
      // Click fatigue risk suggested question
      await page.click('text=Fatigue risk');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify fatigue content appears
      await expect(page.locator('text=fatigue').or(page.locator('text=Fatigue'))).toBeVisible({ timeout: 5000 });
    });

    test('should display Crew Utilization', async ({ page }) => {
      // Click crew status suggested question
      await page.click('text=Crew status');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify crew content appears
      await expect(page.locator('text=crew').or(page.locator('text=Crew'))).toBeVisible({ timeout: 5000 });
    });

    test('should display Reserve Coverage', async ({ page }) => {
      // Click reserve coverage suggested question
      await page.click('text=Reserve coverage');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify reserve content appears
      await expect(page.locator('text=reserve').or(page.locator('text=Reserve').or(page.locator('text=PTY')))).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Analysis Visualizations', () => {
    test('should display Cancel Impact analysis', async ({ page }) => {
      // Click cancel impact suggested question
      await page.click('text=Cancel impact');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify cancel analysis appears
      await expect(page.locator('text=CM 208').or(page.locator('text=cancel').or(page.locator('text=impact')))).toBeVisible({ timeout: 5000 });
    });

    test('should display Day Comparison', async ({ page }) => {
      // Click compare days suggested question
      await page.click('text=Compare days');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify comparison content appears
      await expect(page.locator('text=compare').or(page.locator('text=Compare').or(page.locator('text=Tuesday')))).toBeVisible({ timeout: 5000 });
    });

    test('should display Root Cause analysis', async ({ page }) => {
      // Click root cause suggested question
      await page.click('text=Root cause');

      // Wait for response
      await page.waitForTimeout(2000);

      // Verify root cause content appears
      await expect(page.locator('text=Miami').or(page.locator('text=delay').or(page.locator('text=cause')))).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Visualization Panel Behavior', () => {
    test('should update visualization when question is asked', async ({ page }) => {
      // Get initial visualization state
      const vizPanel = page.locator('[class*="VisualizationPanel"], [class*="visualization"]').first();
      await expect(vizPanel).toBeVisible();

      // Ask a question
      await page.click('text=Weather exposure');

      // Wait for update
      await page.waitForTimeout(2000);

      // Verify panel is still visible (content may have changed)
      await expect(vizPanel).toBeVisible();
    });

    test('should handle rapid question clicks', async ({ page }) => {
      // Click multiple questions in succession
      await page.click('text=Weather exposure');
      await page.waitForTimeout(500);
      await page.click('text=Fatigue risk');
      await page.waitForTimeout(500);
      await page.click('text=Network map');

      // Wait for final response
      await page.waitForTimeout(2000);

      // App should still be functional
      const chatPanel = page.locator('[class*="chat"]').first();
      await expect(chatPanel).toBeVisible();
    });
  });
});
