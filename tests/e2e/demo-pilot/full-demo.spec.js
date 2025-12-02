// @ts-check
import { test, expect } from '@playwright/test';
import { demoConfig, getOrderedScenes, scenes } from './narration-hooks.js';

/**
 * Full Demo Script for Demo-Pilot Integration
 *
 * This test runs through the complete Crew Controller demo with timing
 * designed to sync with external audio narration from Eleven Labs.
 *
 * Usage:
 *   npx playwright test tests/e2e/demo-pilot/full-demo.spec.js --headed
 *   npx playwright test tests/e2e/demo-pilot/full-demo.spec.js --headed --slow-mo=100
 *
 * For demo-pilot integration, this test emits custom events that can be
 * captured by the demo-pilot orchestrator for audio synchronization.
 */

test.describe('Full Demo - Crew Controller', () => {
  test.setTimeout(300000); // 5 minutes for full demo

  /**
   * Helper to wait and allow narration to complete
   */
  const waitForNarration = async (page, duration) => {
    await page.waitForTimeout(duration);
  };

  /**
   * Helper to execute a step action
   */
  const executeAction = async (page, action) => {
    if (!action) return;

    switch (action.type) {
      case 'click':
        await page.click(action.selector);
        break;
      case 'fill':
        await page.fill(action.selector, action.value);
        break;
      case 'press':
        await page.press(action.selector, action.key);
        break;
      case 'hover':
        await page.hover(action.selector);
        break;
      default:
        break;
    }
  };

  /**
   * Helper to log step for demo-pilot sync
   */
  const logStep = (step, scene) => {
    console.log(`\n[DEMO-STEP] ${step.id}`);
    console.log(`[SCENE] ${scene.name}`);
    console.log(`[NARRATION] ${step.narration}`);
    console.log(`[DURATION] ${step.duration}ms`);
    if (step.action) {
      console.log(`[ACTION] ${JSON.stringify(step.action)}`);
    }
  };

  test('Complete Demo Walkthrough', async ({ page }) => {
    // Set viewport for demo recording
    await page.setViewportSize(demoConfig.viewport);

    // Navigate to application
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    console.log('\n========================================');
    console.log('CREW CONTROLLER DEMO - STARTING');
    console.log('========================================\n');

    const orderedScenes = getOrderedScenes();

    for (const scene of orderedScenes) {
      console.log(`\n--- SCENE: ${scene.name} ---`);
      console.log(`Description: ${scene.description}\n`);

      for (const step of scene.steps) {
        logStep(step, scene);

        // Wait for element if specified
        if (step.waitFor) {
          try {
            await page.waitForSelector(step.waitFor, { timeout: 10000 });
          } catch (e) {
            console.log(`[WARN] Selector not found: ${step.waitFor}`);
          }
        }

        // Execute action if specified
        if (step.action) {
          try {
            await executeAction(page, step.action);
            await page.waitForTimeout(500); // Small pause after action
          } catch (e) {
            console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
          }
        }

        // Wait for narration duration
        await waitForNarration(page, step.duration);
      }
    }

    console.log('\n========================================');
    console.log('CREW CONTROLLER DEMO - COMPLETE');
    console.log('========================================\n');
  });

  test('Scene 1: Shift Start Only', async ({ page }) => {
    await page.setViewportSize(demoConfig.viewport);
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    const scene = scenes.shiftStart;
    console.log(`\n--- Running: ${scene.name} ---\n`);

    for (const step of scene.steps) {
      logStep(step, scene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }
  });

  test('Scene 3: Disruption Alert Only', async ({ page }) => {
    await page.setViewportSize(demoConfig.viewport);
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    const scene = scenes.disruptionAlert;
    console.log(`\n--- Running: ${scene.name} ---\n`);

    for (const step of scene.steps) {
      logStep(step, scene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }
  });

  test('Scene 5: Shift End Only', async ({ page }) => {
    await page.setViewportSize(demoConfig.viewport);
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    const scene = scenes.shiftEnd;
    console.log(`\n--- Running: ${scene.name} ---\n`);

    for (const step of scene.steps) {
      logStep(step, scene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }
  });

  test('Weather and Network Exploration', async ({ page }) => {
    await page.setViewportSize(demoConfig.viewport);
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    // First trigger shift start to enable suggested questions
    console.log('\n--- Setting up: Triggering Shift Start ---\n');
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await page.click('button:has-text("Scene 1: Shift Start")');
    await page.waitForTimeout(2000);

    // Run weather exploration
    const weatherScene = scenes.weatherExploration;
    console.log(`\n--- Running: ${weatherScene.name} ---\n`);

    for (const step of weatherScene.steps) {
      logStep(step, weatherScene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }

    // Run network map
    const networkScene = scenes.networkMap;
    console.log(`\n--- Running: ${networkScene.name} ---\n`);

    for (const step of networkScene.steps) {
      logStep(step, networkScene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }
  });

  test('Disruption Resolution Flow', async ({ page }) => {
    await page.setViewportSize(demoConfig.viewport);
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();

    // Run disruption alert
    const disruptionScene = scenes.disruptionAlert;
    console.log(`\n--- Running: ${disruptionScene.name} ---\n`);

    for (const step of disruptionScene.steps) {
      logStep(step, disruptionScene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }

    // Run resolution selection
    const resolutionScene = scenes.resolutionSelection;
    console.log(`\n--- Running: ${resolutionScene.name} ---\n`);

    for (const step of resolutionScene.steps) {
      logStep(step, resolutionScene);

      if (step.waitFor) {
        try {
          await page.waitForSelector(step.waitFor, { timeout: 10000 });
        } catch (e) {
          console.log(`[WARN] Selector not found: ${step.waitFor}`);
        }
      }

      if (step.action) {
        try {
          await executeAction(page, step.action);
          await page.waitForTimeout(500);
        } catch (e) {
          console.log(`[WARN] Action failed: ${JSON.stringify(step.action)}`);
        }
      }

      await waitForNarration(page, step.duration);
    }
  });
});

/**
 * Quick smoke test for demo validation
 */
test.describe('Demo Smoke Test', () => {
  test('should load application', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Crew Controller')).toBeVisible();
  });

  test('should open demo controls', async ({ page }) => {
    await page.goto('/');
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await expect(page.locator('text=Demo Controls')).toBeVisible();
  });

  test('should trigger all demo scenes', async ({ page }) => {
    await page.goto('/');

    // Scene 1
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await page.click('button:has-text("Scene 1: Shift Start")');
    await expect(page.locator('.prose')).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(1000);

    // Scene 3
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await page.click('button:has-text("Scene 3: Disruption Alert")');
    await expect(page.locator('text=CRITICAL').first()).toBeVisible({ timeout: 5000 });
    await page.waitForTimeout(1000);

    // Scene 5
    await page.click('button[title="Open Demo Controls (Ctrl+D)"]');
    await page.click('button:has-text("Scene 5: Shift End")');
    await expect(page.locator('text=Performance').or(page.locator('text=Shift'))).toBeVisible({ timeout: 5000 });
  });
});
