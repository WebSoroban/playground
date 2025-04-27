"use client";

import React, { FormEvent, useRef, useState } from 'react'
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { getPlaneKeyframes } from '../lib/getPlaneKeyframes';
import { getTrailsKeyframes } from '../lib/getTrailsKeyframes';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import axios from 'axios';

const Newsletter = () => {

  const [input, setInput] = useState("");
  const [active, setActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  //const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef(null);
  const { to, fromTo, set } = gsap;

  const container = useRef();
  const tl = useRef();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray('.box');
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, '<')
        .to(boxes[2], { y: -166 })
        .reverse();
    },
    { scope: container }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    console.log(button);

    if(!email || !button) return console.log("button");

    if(!active) {
      setActive(true);
      //console.log("we are here!")
      //gsap animation

      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput), 
      });

      to(button, { keyframes: getTrailsKeyframes(button) });
    }

    /* const res = await fetch("/api/addSubscription", {
      body: JSON.stringify({ email }),
      header: { "content-Type": "application/json" },
      method: "POST",
    });
    const data = await esbuildVersion.json(); */

    /* if (data.error) {
      setErrorMessage("Hey, you are already subscribed!");
      setSuccessMessage(undefined);
      return;
    } */

    //setSuccessMessage(data.res);
    //setErrorMessage("");

    try {
      const response = await axios.post('https://websorobanserver.vercel.app/api/subscribe', { email });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Subscription failed');
      setSuccessMessage("");
    }
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  }

  return (
    <div className='flex flex-col space-y-8 md:w-[400px]'>
        <form
          onSubmit={handleSubmit}
          className='newsletter-form mt-10 animate-fade-in-3'
        >
            <div className='group flex items-center gap-x-4 py-3 pl-4 pr-1 rounded-[9px] bg-[#090D11] hover:bg-[#15141B] shadow-outline-gray hover:shadow-transparent focus-within:bg-[#15141B] focus-within:!shadow-outline-gray-focus transition-all duration-300'>
                <EnvelopeIcon className="hidden sm:inline w-6 h-6 text-[#484C52] group-focus-within:text-white group-hover:text-white transition-colors duration-300" />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder='Email'
                    required
                    className='flex-1 text-white text-sm sm:text-base outline-none placeholder-[#4B4C52] group-focus-within:placeholder-white bg-transparent placeholder:transition-colors placeholder:duration-300'
                />
                <button
                  ref={buttonRef}
                  className={`${
                    active && "active"
                  } disabled:!bg-[#17141F] disabled:grayscale-[65%] disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base`}
                  disabled={!input}
                  type="submit"
                  onClick={handleSubmit}
                >
                  <span className='default'>Subscribe</span>
                  <span className='success'>
                    <svg viewBox='0 0 16 16'>
                      <polyline points="3.75 9 7 12 13 5"></polyline>
                    </svg>
                    Done
                  </span>
                  <svg className='trails' viewBox='0 0 33 64'>
                    <path d="M26,4 C28, 13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
                    <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
                  </svg>
                  <div className='plane'>
                    <div className='left'></div>
                    <div className='right'></div>
                  </div>
                </button>
            </div>
      </form>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default Newsletter