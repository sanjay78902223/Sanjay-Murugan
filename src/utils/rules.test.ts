import test from 'node:test';
import assert from 'node:assert/strict';
import { clamp, lerp, mapRange, smoothstep, calculateCubeState } from './scrollMath';
import { validateContactForm } from './validation';

test('clamp restricts values to min and max boundaries', () => {
  assert.equal(clamp(0.5, 0, 1), 0.5);
  assert.equal(clamp(-0.2, 0, 1), 0);
  assert.equal(clamp(1.5, 0, 1), 1);
});

test('lerp calculates linear interpolation accurately', () => {
  assert.equal(lerp(10, 20, 0), 10);
  assert.equal(lerp(10, 20, 0.5), 15);
  assert.equal(lerp(10, 20, 1), 20);
});

test('mapRange maps values between ranges with clamping', () => {
  assert.equal(mapRange(5, 0, 10, 100, 200), 150);
  assert.equal(mapRange(15, 0, 10, 100, 200), 200);
});

test('smoothstep generates S-curve easing', () => {
  assert.equal(smoothstep(0, 1, 0), 0);
  assert.equal(smoothstep(0, 1, 0.5), 0.5);
  assert.equal(smoothstep(0, 1, 1), 1);
});

test('calculateCubeState handles 4 distinct scroll stages', () => {
  const stage0 = calculateCubeState(0.2);
  assert.equal(stage0.activeStageIndex, 0);
  assert.equal(stage0.opacity, 0);

  const stage1 = calculateCubeState(0.5);
  assert.equal(stage1.activeStageIndex, 1);
  assert.ok(stage1.opacity > 0);

  const stage2 = calculateCubeState(0.65);
  assert.equal(stage2.activeStageIndex, 2);
  assert.ok(stage2.rotX > 2.2);

  const stage3 = calculateCubeState(0.8);
  assert.equal(stage3.activeStageIndex, 3);
  assert.ok(stage3.scale > 1.3);

  const stage4 = calculateCubeState(0.95);
  assert.equal(stage4.activeStageIndex, 4);
});

test('validateContactForm rejects empty inputs', () => {
  const result = validateContactForm({
    name: '',
    businessName: '',
    email: 'invalid-email',
    phone: '123',
    enquiry: 'short',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.businessName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.enquiry);
});

test('validateContactForm accepts valid submission', () => {
  const result = validateContactForm({
    name: 'Aarav Patel',
    businessName: 'Apex Coaching Academy',
    email: 'aarav@apexcoaching.edu',
    phone: '+91 98765 43210',
    enquiry: 'We need an automated AI voice agent to qualify student admission enquiries and WhatsApp follow-up.',
    selectedService: 'AI Voice Agents',
  });
  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});
