class Raka {
    constructor(x, y, length, size) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.size = size;
        this.angle = 0;
        this.angles = [];
        this.sizes = [];
    }

    init() {
        for(let i = 0; i < this.length; i++) {
            this.angles[i] = 0;
            this.sizes[i] = this.size;
        }
    }

    draw() {
        let deg = this.angles[0], nextPositionX, nextPositionY;
        for(let i = 0; i < this.length; i++) {
            if(i == 0) {
                drawImage(arm1, this.x, this.y, this.sizes[i], this.sizes[i]/2, this.angles[i]);
                nextPositionX = this.x + Math.cos(this.angles[i] * Math.PI/180) * this.sizes[i] * 0.8;
                nextPositionY = this.y + Math.sin(this.angles[i] * Math.PI/180) * this.sizes[i] * 0.8;
            } else {
                drawImage(arm2, nextPositionX, nextPositionY, this.sizes[i], this.sizes[i]/2, deg + this.angles[i]);
                nextPositionX += Math.cos((deg + this.angles[i]) * Math.PI/180) * this.sizes[i - 1] * 0.8;
                nextPositionY += Math.sin((deg + this.angles[i]) * Math.PI/180) * this.sizes[i - 1] * 0.8;
                deg += this.angles[i];
            }
        }

        this.goTo(mouseX, mouseY);
    }

    update() {
        if(Input.GetKey(KeyCode.W)) {
            this.angles[0] += 2;
        } if(Input.GetKey(KeyCode.S)) {
            this.angles[0] -= 2;
        }

        if(Input.GetKey(KeyCode.A)) {
            for(let i = 1; i < this.length; i++) {
                this.angles[i] -= 1;
            }
        } if(Input.GetKey(KeyCode.D)) {
            for(let i = 1; i < this.length; i++) {
                this.angles[i] += 1;
            }
        }
    }

    goTo(x, y) {
        // for(let angle1 = 0; angle1 < 360; angle1++) {
        //     for(let angle2 = 0; angle2 < 360; angle2++) {
        //         let deg = angle1, nextPositionX, nextPositionY, itsDone = false;
        //         for(let i = 0; i < this.length; i++) {
        //             if(i == 0) {
        //                 // drawImage(arm1, this.x, this.y, this.sizes[i], this.sizes[i]/2, angle1);
        //                 nextPositionX = this.x + Math.cos(angle1 * Math.PI/180) * this.sizes[i] * 0.8;
        //                 nextPositionY = this.y + Math.sin(angle1 * Math.PI/180) * this.sizes[i] * 0.8;
        //             } else {
        //                 // drawImage(arm2, nextPositionX, nextPositionY, this.sizes[i], this.sizes[i]/2, deg + angle2);
        //                 nextPositionX += Math.cos((deg + this.angles[i]) * Math.PI/180) * this.sizes[i - 1] * 0.8;
        //                 nextPositionY += Math.sin((deg + this.angles[i]) * Math.PI/180) * this.sizes[i - 1] * 0.8;
        //                 deg += this.angles[i];
        //             }

        //             if(distance(x, y,  nextPositionX, nextPositionY) < 50) {
        //                 if(i == 0) {
        //                     drawImage(arm1, this.x, this.y, this.sizes[i], this.sizes[i]/2, angle1);
        //                     nextPositionX = this.x + Math.cos(angle1 * Math.PI/180) * this.sizes[i] * 0.8;
        //                     nextPositionY = this.y + Math.sin(angle1 * Math.PI/180) * this.sizes[i] * 0.8;
        //                 } else {
        //                     drawImage(arm2, nextPositionX, nextPositionY, this.sizes[i], this.sizes[i]/2, deg + angle2);
        //                     nextPositionX += Math.cos((deg + angle2) * Math.PI/180) * this.sizes[i - 1] * 0.8;
        //                     nextPositionY += Math.sin((deg + angle2) * Math.PI/180) * this.sizes[i - 1] * 0.8;
        //                     deg += angle2;
        //                 }

        //                 itsDone = true;
        //             }
        //         }

        //         if(itsDone) {
        //             return;
        //         }
        //     }
        // }
    }
}

let raka1 = new Raka(200, 200, 10, 100);

function init() {
    raka1.init();
}

function update() {
    raka1.update();
}

function draw() {
    raka1.draw();
}