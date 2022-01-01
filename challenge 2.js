function main() {
    //Access the canvas through DOM: Document Object Model
    var canvas = document.getElementById('myCanvas');   // The paper
    var gl = canvas.getContext('webgl');                // The brush and the paints

    // Define vertices data
    /**
     * A ( -0.5, -0.5 )
     * B (  0.5, -0.5 )
     * C (  0.5,  0.5 )
     * D ( -0.5,  0.5 )
     */

    var vertices_kiri = [
        //for the torso
        -0.6, 0.1, 0.035, 0.035, 0.035,     // Point A
        -0.3, 0.1, 0.035, 0.035, 0.035,     // Point B
        -0.3,  0.7, 0.02, 0.02, 0.02,     // Point C
 
        -0.3,  0.7, 0.02, 0.02, 0.02,     // Point C
        -0.6,  0.7, 0.02, 0.02, 0.02,     // Point D
        -0.6, 0.1, 0.035, 0.035, 0.035,    // Point A

        // for left limb
        -0.6, 0.7, 0.02, 0.02, 0.02,
        -0.9, 0.5, 0.0, 0.0, 0.0,
        -0.88, 0.4, 0.0, 0.0, 0.0,

        -0.88, 0.4, 0.0, 0.0, 0.0,
        -0.6, 0.7, 0.02, 0.02, 0.02,
        -0.6, 0.53, 0.02, 0.02, 0.02,

        // for right limb
        -0.3, 0.7, 0.02, 0.02, 0.02,
        -0.06, 0.5, 0.0, 0.0, 0.0,
        -0.08, 0.4, 0.0, 0.0, 0.0,

        -0.08, 0.4, 0.0, 0.0, 0.0,
        -0.3, 0.7, 0.02, 0.02, 0.02,
        -0.3, 0.53, 0.02, 0.02, 0.02,

        // for the collar
            //box of collar
        -0.55, 0.72, 0.0, 0.0, 0.0,
        -0.55, 0.7, 0.0, 0.0, 0.0,
        -0.3, 0.7, 0.0, 0.0, 0.0,

        -0.35, 0.7, 0.0, 0.0, 0.0,
        -0.35, 0.72, 0.0, 0.0, 0.0,
        -0.55, 0.7, 0.0, 0.0, 0.0,

            //blue color in the collar
        -0.525, 0.7, 0.0, 0.0, 1.0,
        -0.375, 0.7, 0.0, 0.0, 1.0,
        -0.45, 0.68, 0.0, 0.0, 1.0,

            //border of collar
        -0.50, 0.66, 0.0, 0.0, 0.0,
        -0.40, 0.66, 0.0, 0.0, 0.0,
        -0.55, 0.7, 0.0, 0.0, 0.0,

        -0.35, 0.7, 0.0, 0.0, 0.0,
        -0.50, 0.66, 0.0, 0.0, 0.0,
        -0.40, 0.66, 0.0, 0.0, 0.0

    ];

    var vertices_kanan = [
        //for the torso
        0.6, 0.1, 0.035, 0.035, 0.035,     // Point A
        0.3, 0.1, 0.035, 0.035, 0.035,     // Point B
        0.3,  0.7, 0.02, 0.02, 0.02,     // Point C
 
        0.3,  0.7, 0.02, 0.02, 0.02,     // Point C
        0.6,  0.7, 0.02, 0.02, 0.02,     // Point D
        0.6, 0.1, 0.035, 0.035, 0.035,    // Point A

        // for left limb
        0.6, 0.7, 0.02, 0.02, 0.02,
        0.9, 0.5, 0.0, 0.0, 0.0,
        0.88, 0.4, 0.0, 0.0, 0.0,

        0.88, 0.4, 0.0, 0.0, 0.0,
        0.6, 0.7, 0.02, 0.02, 0.02,
        0.6, 0.53, 0.02, 0.02, 0.02,

        // for right limb
        0.3, 0.7, 0.02, 0.02, 0.02,
        0.06, 0.5, 0.0, 0.0, 0.0,
        0.08, 0.4, 0.0, 0.0, 0.0,

        0.08, 0.4, 0.0, 0.0, 0.0,
        0.3, 0.7, 0.02, 0.02, 0.02,
        0.3, 0.53, 0.02, 0.02, 0.02,

        // for the collar
            //box of collar
        0.55, 0.72, 0.0, 0.0, 0.0,
        0.55, 0.7, 0.0, 0.0, 0.0,
        0.3, 0.7, 0.0, 0.0, 0.0,

        0.35, 0.7, 0.0, 0.0, 0.0,
        0.35, 0.72, 0.0, 0.0, 0.0,
        0.55, 0.7, 0.0, 0.0, 0.0        

    ];

    var vertices = [...vertices_kiri,...vertices_kanan]; 

    // Create a linked-list for storing the vertices data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform vec2 uChange;
        void main() {
            gl_PointSize = 10.0;
            gl_Position = vec4(aPosition + uChange, 0.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);    // Yellow
        }
    `;

    // Create .c in GPU
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compile .c into .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // Prepare a .exe shell (shader program)
    var shaderProgram = gl.createProgram();

    // Put the two .o files into the shell
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the two .o files, so together they can be a runnable program/context.
    gl.linkProgram(shaderProgram);

    // Start using the context (analogy: start using the paints and the brushes)
    gl.useProgram(shaderProgram);

    // Teach the computer how to collect
    //  the positional values from ARRAY_BUFFER
    //  to each vertex being processed
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition, 
        2, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor, 
        3, 
        gl.FLOAT, 
        false, 
        5 * Float32Array.BYTES_PER_ELEMENT, 
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    var freeze = false;
    // Apply some interaction using mous
    document.addEventListener("click", onMouseClick, false);

    var speed = [0, 0.0114];
    // Create a uniform to animate the vertices
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");
    var change = [0.1, 0];
    var change_kiri = [-0.1, 0];

    function render() {
        if (!freeze) {
            

            gl.clearColor(0.5, 0.5, 0.5, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform2fv(uChange, change_kiri);
            gl.drawArrays(gl.TRIANGLES, 0, vertices_kiri.length/5);

            gl.uniform2fv(uChange, change);
            gl.drawArrays(gl.TRIANGLES, vertices_kiri.length/5, vertices_kanan.length/5);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}