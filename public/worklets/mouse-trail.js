// Mouse trail effect without blocking main thread
registerPaint('mouse-trail', class {
  static get inputProperties() {
    return ['--mouse-x', '--mouse-y', '--trail-color'];
  }

  static get contextOptions() {
    return { alpha: true };
  }

  paint(ctx, size, props) {
    const mouseX = parseFloat(props.get('--mouse-x')?.toString() || '0');
    const mouseY = parseFloat(props.get('--mouse-y')?.toString() || '0');
    const color = props.get('--trail-color')?.toString() || 'rgba(99, 102, 241, 0.5)';

    // Create gradient from mouse position
    const gradient = ctx.createRadialGradient(
      mouseX, mouseY, 0,
      mouseX, mouseY, 150
    );

    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);

    // Add some circles for effect
    for (let i = 0; i < 5; i++) {
      const offset = i * 30;
      const alpha = 0.3 - (i * 0.05);

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, offset, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(/[\d.]+\)/, `${alpha})`);
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
});
