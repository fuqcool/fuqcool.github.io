Absolute positioning is probably one of the most common yet tricky job in CSS. Because many developers don't really know that absolute position only works inside a container whose position property is not static. The resulting page therefore looks like:

image

But we want to put the red rectangle on bottom-right corner of **container**! Absolute positioned element will search for the first parent that has position property other than static. In this case, there are none. So it just take the outer most element -- **html** as its parent.

The trick to solve the issue works like magic: Simply change position of **container** to **relative**. Woohoooo! We are done with the problem that has been annoying us for the whole day!

