import * as THREE from 'three';
import {useRef, useEffect, useState} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import axisImage from "../../resources/axis.png";

export default function Three() {

    const canvas = useRef(document.createElement('canvas'));
    let animate;

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const loader = new THREE.TextureLoader()
        const renderer = new THREE.WebGLRenderer({canvas: canvas.current});
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        // Box in center
        /*
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
         */
        // Axis
        const axisGeometry = new THREE.PlaneGeometry(3, 3);
        const axisMaterial = new THREE.MeshBasicMaterial({
            map: loader.load(axisImage),
            transparent: true
        });
        axisMaterial.side = THREE.DoubleSide;
        const axis = new THREE.Mesh(axisGeometry, axisMaterial);
        axis.rotateX(THREE.MathUtils.degToRad(90));
        scene.add(axis);

        // Parametric geometry
        const paramFunc = (u, v, target) => {
            console.log()
            const x = u;
            const y = v;
            const z = u+v;
            return new THREE.Vector3(x, y, z);
        }
        const paramGeometry = new THREE.ParametricGeometry(paramFunc, 100, 100)
        const paramMaterial = new THREE.MeshBasicMaterial()
        const paramMesh = new THREE.Mesh(paramGeometry, paramMaterial);
        scene.add(paramMesh);



        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        camera.position.z = 5;

        const controls = new OrbitControls(camera, canvas.current);
        controls.enableDamping = true;

        animate = function () {
            requestAnimationFrame(animate);

            controls.update()

            renderer.render(scene, camera);
        };
        animate();
    })

    return (
        <canvas ref={canvas}/>
    );
}