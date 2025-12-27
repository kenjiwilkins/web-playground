// Responsive geometric pattern that changes with window size
registerPaint('responsive-pattern', class {
  static get inputProperties() {
    return ['--pattern-color', '--pattern-spacing'];
  }

  static get contextOptions() {
    return { alpha: true };
  }

  paint(ctx, size, props) {
    const color = props.get('--pattern-color')?.toString() || '#4f46e5';
    const spacing = parseInt(props.get('--pattern-spacing')?.toString() || '40');

    // Calculate number of shapes based on size
    const cols = Math.floor(size.width / spacing);
    const rows = Math.floor(size.height / spacing);

    // Use size ratio to determine shape
    const ratio = size.width / size.height;

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + spacing / 2;
        const y = j * spacing + spacing / 2;
        const shapeSize = spacing * 0.4;

        // Different shapes based on aspect ratio
        if (ratio > 1.5) {
          // Wide: horizontal lines
          ctx.beginPath();
          ctx.moveTo(x - shapeSize, y);
          ctx.lineTo(x + shapeSize, y);
          ctx.stroke();
        } else if (ratio < 0.67) {
          // Tall: vertical lines
          ctx.beginPath();
          ctx.moveTo(x, y - shapeSize);
          ctx.lineTo(x, y + shapeSize);
          ctx.stroke();
        } else {
          // Square-ish: circles
          ctx.beginPath();
          ctx.arc(x, y, shapeSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
});
