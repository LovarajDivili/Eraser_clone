import React from 'react'

export const Hero = () => {
  return (
    <div>
      <section>

<div className="flex items-baseline justify-center pt-20">
<h2 className="rounded-full px-3 p-2  font-medium shadow">
  See What's New | <span className="text-red-600 ">AI Diagram</span>
</h2>
</div>

      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Documents & diagrams
        <strong className="font-extrabold text-red-700 sm:block"> for engineering teams.  </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      All-in-one markdown editor, collaborative canvas, and diagram-as-code builder
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
