/**
 * Created by amita on 4/22/2016.
 */


export let logEventsConfig = {
    logGroupName: 'US-QA', /* required */
    logStreamName: 'tomcat', /* required */

    limit: 4,
    nextToken: null,
    startFromHead: true || false,
    startTime: 0
};


export let filterLogParams = {
    logGroupName: 'US-QA', /* required */
    interleaved: true,
    logStreamNames: [
        'tomcat'
    ],
    nextToken:null

};

