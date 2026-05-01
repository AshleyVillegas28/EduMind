import { Component, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  phase: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId!: number;
  private resizeListener!: () => void;

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('starsCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();
    this.generateStars(180);

    this.resizeListener = () => {
      this.resizeCanvas();
      this.generateStars(180);
    };
    window.addEventListener('resize', this.resizeListener);
    this.animate();
  }

  private resizeCanvas(): void {
    const wrapper = this.canvas.parentElement!;
    this.canvas.width = wrapper.offsetWidth;
    this.canvas.height = wrapper.offsetHeight;
  }

  private generateStars(count: number): void {
    this.stars = [];
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.8 + 0.4,
        opacity: Math.random(),
        speed: Math.random() * 0.012 + 0.004,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const now = performance.now() * 0.001;

    for (const star of this.stars) {
      const opacity = 0.3 + 0.7 * Math.abs(Math.sin(now * star.speed * 10 + star.phase));
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      this.ctx.fill();
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resizeListener);
  }
}
