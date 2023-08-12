import { erf } from "mathjs";
 



class Segment {
    _key;
    _startTime;
    _endTime;
    
    constructor(index, totalDuration, segNum) {
        this._key = index;
        this._startTime = this._key>0?((this._key-1)/segNum) * totalDuration: 0;
        this._endTime = this._key>0?(this._key/segNum) * totalDuration: (1/segNum) * totalDuration;
    }

    get key() { return this._key; }
    get start() { return this._startTime; }
    get end() { return this._endTime; }
    

    set start(value) { this._startTime = value;}
    set end(value) { this._endTime = value;}
    


    setStart(value) { this._startTime = value;}
    setEnd(value) { this._endTime = value;}
    setStartCDF(value) { this._startCDF = value;}
    setEndCDF(value) { this._endCDF =  value;}

    computeStart(totalSeg, totalTime) { 
        this._startTime = this._key>0?((this._key-1)/totalSeg) * totalTime: 0;
    }

    computeEnd(totalSeg, totalTime) {
        this._endTime = this._key>0?(this._key/totalSeg) * totalTime: (1/totalSeg) * totalTime;
    }
}

class SubTimer extends Segment {
    _duration;
    _startCDF;
    _endCDF;
    constructor(index, totalDuration, segNum) { 
        super(index, totalDuration, segNum); 
        this._duration = this._endTime - this._startTime;
    }

    set duration(value) { this._duration = value; }
    set startCDF(value) { this._startCDF = value;}
    set endCDF(value) { this._endCDF =  value;}
    
    get duration() { return this._duration; }
    get startCDF() { return this._startCDF; }
    get endCDF() { return this._endCDF; }

    setDuration(value) { this.duration = value; }

    
    
}

class Timer {
    #id;
    #title;
    #duration;
    #endDate;
    #slicingMethod;
    #timeSlices;

    constructor(id, title, duration, endDate, slicingMethod, timeSlices) {
        this.#id = id;
        this.#title = title;
        this.#duration = duration;
        this.#endDate = endDate;
        this.#slicingMethod = slicingMethod;
        this.#timeSlices = timeSlices;
    }



}

function stanNormalCDF(value) {
    let cdf = 1-erf((-value/Math.sqrt(2)));
    return cdf;
}


function skewedNormCDF(x, a, mean, stddev) {
    let inv=-1;
    let standard_cdf = stanNormalCDF((x - mean) /stddev);
    //let adjustment_term = 2*Math.exp(stanNormalCDF(-a*(x-mean)/stddev)/(1+Math.exp((inv*(a*(x-mean)/stddev)**2*Math.PI/2))));
    let adjustment_term = 2*stanNormalCDF(-a*((x-mean)/stddev));

    console.log('this is the adjustment term' + adjustment_term);
    console.log('this is the standard_cdf' + standard_cdf);
    return (standard_cdf - adjustment_term)
}

function CreateNewSeg(index,duration,segNum) {
    let newSubTimer = new SubTimer(index);
    newSubTimer.computeStart(segNum,duration);
    newSubTimer.computeEnd(segNum,duration);

    return newSubTimer;
}

function CurveHandler() {

}

function SkwCurveHandle(subTimGrp, segNum, duration) {
    //console.log(subTimGrp);
    //console.log(subTimGrp.length);
    //note: a larger ending aphla will make a set with a small intale timer but with the swkuness towards the start.
    //not: equal aphlas will make the set start with the largest intale timer to the smallest timer.
    //a standatrd devation of (durtion * 0.341*0.682) [0.232562] with an Starting aphla of .3 and .5 for ending will produce a proper set of timers equalling to duration
    //a standatrd devation of (durtion * 0.341*0.9405) [0.3207105] with an Starting aphla of .4 and .5 for ending will produce a proper set of timers equalling to duration
    //a standatrd devation of (durtion * 0.341*0.962) [0.328042] with an Starting aphla of .4 and .4 for ending will produce a proper set of timers equalling to duration
    let stddev = duration*(0.341)*0.682;
    let mean = duration/2;
    let P;
    for (let i = 0; i < segNum; i++) {
        subTimGrp[i].startCDF = skewedNormCDF( subTimGrp[i].start,.3,mean, stddev);
        subTimGrp[i].endCDF = skewedNormCDF(subTimGrp[i].end,.5,mean, stddev);
        P = subTimGrp[i].endCDF - subTimGrp[i].startCDF;
        console.log('this is P' + P);
        subTimGrp[i].duration = P*subTimGrp[i].duration;
        //console.log(subTimGrp[i]);

    } 

    return subTimGrp;

}

function NormCurveHandler(subTimGrp, segNum, duration) {
    let stddev = duration*(0.341);
    let mean = duration/2;
    let P;
    for (let i = 0; i < segNum; i++) {
        subTimGrp[i].startCDF = stanNormalCDF( (subTimGrp[i].start-mean)/stddev);
        subTimGrp[i].endCDF = stanNormalCDF((subTimGrp[i].end-mean)/stddev);
        P = subTimGrp[i].endCDF - subTimGrp[i].startCDF;
        subTimGrp[i].duration = P*subTimGrp[i].duration;
        //console.log(subTimGrp[i]);

    } 

    return subTimGrp;
}

function SelectSlicing(curve,subTimGrp, segNum, duration) {
    //default behavor for now

}



export function ComputeSubTimers(totalDuration, segmentNum, curveType, downtime) {
    let segList = [];
    switch (curveType) {
        case "Normal":
            // i = 1 because it'll be used to make the segment index which sould not have a 0 in it
            for (let i = 0; i < segmentNum; i++) {
            segList = [...segList, new SubTimer(i+1, totalDuration, segmentNum)];
            }
            console.log(segList[0]);
            return NormCurveHandler(segList, segmentNum, totalDuration);
        case "Adjusted":
             // i = 1 because it'll be used to make the segment index which sould not have a 0 in it
            for (let i = 0; i < segmentNum; i++) {
            // segList =[...segList, CreateNewSeg(i, totalDuration, segmentNum)];
            segList = [...segList, new SubTimer(i+1, totalDuration, segmentNum)];
            }
            console.log(segList[0]);
            SkwCurveHandle(segList, segmentNum, totalDuration);
            console.log(segList[0]);
            return segList;
        case "Uniformed":
            // i = 1 because it'll be used to make the segment index which sould not have a 0 in it
            for (let i = 0; i < segmentNum; i++) {
            // segList =[...segList, CreateNewSeg(i, totalDuration, segmentNum)];
            segList = [...segList, new SubTimer(i+1, totalDuration, segmentNum)];
            }
            return segList;
        case "Suggested":
             // i = 1 because it'll be used to make the segment index which sould not have a 0 in it
            for (let i = 0; i < segmentNum; i++) {
            // segList =[...segList, CreateNewSeg(i, totalDuration, segmentNum)];
            segList = [...segList, new SubTimer(i+1, totalDuration, segmentNum)];
            }
            return SkwCurveHandle(segList, segmentNum, totalDuration);
        }
    // Implement a switch of some kind to determine which function to use
    
}






