// Hand-drawn / sketchy border like Excalidraw
registerPaint('sketch-border', class {
  static get inputProperties() {
    return ['--sketch-color', '--sketch-roughness'];
  }

  static get contextOptions() {
    return { alpha: true };
  }

  // Simple seeded random for consistency
  random(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Draw a rough line with wobble
  drawRoughLine(ctx, x1, y1, x2, y2, roughness, seed) {
    const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const steps = Math.max(Math.floor(dist / 5), 2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;

      // Add random offset for sketchy effect
      const offsetX = (this.random(seed + i * 1.1) - 0.5) * roughness;
      const offsetY = (this.random(seed + i * 2.3) - 0.5) * roughness;

      ctx.lineTo(x + offsetX, y + offsetY);
    }

    ctx.stroke();
  }

  paint(ctx, size, props) {
    const color = props.get('--sketch-color')?.toString() || '#000000';
    const roughness = parseFloat(props.get('--sketch-roughness')?.toString() || '3');

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const margin = 5;

    // Draw multiple passes for hand-drawn effect
    for (let pass = 0; pass < 2; pass++) {
      const seed = pass * 100;

      // Top
      this.drawRoughLine(ctx,
        margin, margin,
        size.width - margin, margin,
        roughness, seed
      );

      // Right
      this.drawRoughLine(ctx,
        size.width - margin, margin,
        size.width - margin, size.height - margin,
        roughness, seed + 25
      );

      // Bottom
      this.drawRoughLine(ctx,
        size.width - margin, size.height - margin,
        margin, size.height - margin,
        roughness, seed + 50
      );

      // Left
      this.drawRoughLine(ctx,
        margin, size.height - margin,
        margin, margin,
        roughness, seed + 75
      );
    }
  }
});
