# q-show

This is intended as an npm package so that I can re-use the components which display questions. If you take a look at [qShow](https://github.com/Samir70/qShow) (no hyphen) you can see the components I wrote some time ago. They weren't SFCs, with a .vue extension. Much harder to re-use in a different project. So: I am doing it properly now! 

If you clone this repo, you can run my development version where I test the components.

> npm run dev

Then go to localhost:3000/ to see the page. Currently: only the multiple choice component and dummy questions are included.

## installing the npm package

> npm install q-show

Then in, say, app.vue you need to include

```
// in setup:
import { MultipleChoiceQ, dummyQs } from 'q-show'
// those are the only things available at the moment

// in style
@import '../node_modules/q-show/dist/style.css'
// or you can make your own stylesheet, maybe take a look at the source in this repo to see what needs to be accounted for
```

## using the MultipleChoiceQ component

The component needs a qData prop. Bind that to an object. DummyQs is a good source for the format of these objects. 
```
{
    qType: 'multiChoice', question: 'What do you call the longest chord in a circle?',
    answer: 'diameter', wrongOptions: ['radius', 'tangent', 'line'],
    feedback: 'The longest chord of a circle is called the diameter.'
}
```
And the 'html' for the page will look like:
```
<MultipleChoiceQ v-if="showQ" v-bind:qData="currentQ" v-on:user-answered="respondToAns" />
```
As you can see, the component will handle getting an answer from the user and emit an action passing an object to the method 'respondToAns' which you have to write yourself! (So you can change the name, if you prefer!). The object passed will look like:

```
{ status: true, mark: "Correct! ", extra: "The longest chord of a circle is called the diameter." }
```
These keys need changing! They do not describe the data being passeed. I don't know what I was thinking. So: watch this space for potentially breaking changes when this is made better.
