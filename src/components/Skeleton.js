
import classNames from 'classnames';

function Skeleton({times, className}) {

    const outerClassNames = classNames(
        'relative',     //allows to position the inner element absolutely
        'overflow-hidden',   //hide the inner element if they are not overlapping
        'bg-gray-200',       //background
        'rounded',           //rounded corners
        'mb-2.5',            //margin at the bottom
        className            //input height and width of the box
    );

    const innerClassNames = classNames(
        'animate-shimmer',  //applies the animation defined in tailwind.config.js
        'absolute',              //position it absolutely
        'inset-0',               //expand to fill the outer div
        '-translate-x-full',     //position the gradient box all the way to the left, animation doesn't work without the leading -
        'bg-gradient-to-r',      //setup gradient in X-direction
        'from-gray-200',         //start gradient from gray 200
        'via-white',             //transition to white
        'to-gray-200'            //end up back to gray 200
    );


    //create an array of length times
    const boxes = Array(times)
        .fill(0)
        .map((_, i) => {

            // Tailwind animation effect:
            // Outer div stays in place, inner div gets moved and contains
            // the gradient that creates the moving effect
            return <div key={i} className={outerClassNames}>
                <div className={innerClassNames}/>
            </div>;
        });

    return boxes;
}

export default Skeleton;