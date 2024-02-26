uniform float time;
uniform vec3 color;

void main() {
    // Swirling distortions based on time and position
    vec3 distortedPosition = position + sin(time + position.length() * 10.0) * 0.1; 

    // Combine swirling effect with color and noise 
    gl_FragColor = vec4(color * (0.5 + noise(distortedPosition * 5.0)), 1.0); 
}
