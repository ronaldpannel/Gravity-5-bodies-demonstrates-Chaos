class Mover {
  constructor(x, y, m, vx, vy) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(vx, vy);
    this.vel.mult(0.5);
    this.acc = new Vector(0, 0);
    this.mass = m;
    this.radius = Math.sqrt(this.mass) * 6;
    this.path = [];
  }
  applyForce(force) {
    let f = Vector.div(force, this.mass);
    this.acc.add(f);
  }
  attract(mover) {
    let force = Vector.sub(this.pos, mover.pos);
    let distanceSq = force.magSq();
    let G = 10;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;

    force.setMag(strength);
    mover.applyForce(force);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.path.push(this.pos.copy());
    if (this.path.length > 1000) {
      this.path.splice(0, 1);
    }
  }
  edges() {
    if (this.pos.x >= canvas.width - this.radius) {
      this.pos.x = canvas.width - this.radius;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.radius) {
      this.pos.x = this.radius;
      this.vel.x *= -1;
    }
    if (this.pos.y >= canvas.height - this.radius) {
      this.pos.y = canvas.height - this.radius;
      this.vel.y *= -1;
    } else if (this.pos.y <= this.radius) {
      this.pos.y = this.radius;
      this.vel.y *= -1;
    }
  }
  draw() {
    for (let i = 0; i < this.path.length - 2; i++) {
      ctx.beginPath();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.moveTo(this.path[i].x, this.path[i].y);
      ctx.lineTo(this.path[i + 1].x, this.path[i + 1].y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
