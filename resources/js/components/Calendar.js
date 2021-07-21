
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from 'react-dom';
import React, {useState, Component} from 'react';
import enGB from 'date-fns/locale/en-GB';
import DatePicker, {registerLocale} from 'react-datepicker';
import {getDay, setHours, setMinutes, format} from 'date-fns';
registerLocale("en-GB", enGB);


/* function Calendar () {
    const [selectedDate, setSelectedDate] = useState(null);
    const isWeekday = (date) => {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
      };


    return (
        <div className = 'container'>
            <DatePicker
            selected = {selectedDate}
            onChange = {date => setSelectedDate(date)}
            filterDate = {isWeekday}
            filterTime = {filterPassedTime}
            locale = "en-GB"
            placeholderText = "Select a weekday"
            showTimeSelect
            timeIntervals = {60}
            dateFormat = "yyyy-MM-d H:mm"
            calendarStartDay = {1}
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 0), 17)}

            />
        </div>
    )
}

export default Calendar
ReactDOM.render(<Calendar />, document.getElementById('root')); */




//TODO: piros jelölés foglaltra
//TODO: üres inital state lekezelése

class Calendar extends Component {

    constructor (props) {
      super(props)
      this.state = {
        startDate: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);

    }

    handleChange(date) {
      this.setState({
        startDate: date
      })
    }

    onFormSubmit(e) {
      e.preventDefault();
      console.log(this.state.startDate)     //TODO: KIVENNI
      fetch('http://test-calendar.test/api/appointment/store', {
          method: 'POST',
          body: JSON.stringify(
              format(this.state.startDate, 'yyyy-MM-dd HH:mm:SS')
          ),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      }).then(function(response){
          response.json().then(function(resp){
              //console.log(resp)
          })
      })
    }


/* Lekérdezi az összes hozzáadott dátumot adatbázisból */
    getAppointments(){
        fetch('http://test-calendar.test/api/appointments/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response){
            response.json().then(function(resp){
                //console.log(resp)
            })
        })
    }

    /* leszűri az eltelt napokat, hogy azokra ne lehessen foglalni */
    filterPassedTime (time) {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
      };
    /* Kiszűri a hétvégéket */
      isWeekday (date) {
        const day = getDay(date);
        return day !== 0 && day !== 6;
    };

    render() {
      return (
        <form onSubmit = { this.onFormSubmit }>
          <div className = "container d-flex justify-content-center">
            <DatePicker
                selected = { this.state.startDate }
                onChange = { this.handleChange }
                filterDate = { this.isWeekday }
                filterTime = { this.filterPassedTime}
                locale = "en-GB"
                placeholderText = "Select a weekday"
                showTimeSelect
                timeIntervals = { 60 }
                dateFormat = "yyyy-MM-dd H:mm"
                calendarStartDay = { 1 }
                minTime = {setHours(setMinutes(new Date(), 0), 9)}
                maxTime = {setHours(setMinutes(new Date(), 0), 17)}
                inline
                className = ""

            />
            <button className="btn btn-primary align-self-end">Make Appointment</button>
          </div>


        </form>
      );
    }

  }

  export default Calendar;
  ReactDOM.render(<Calendar />, document.getElementById('root'));





/* class Calendar extends Component {

    constructor(){
        super();
        this.state={
            date: 0,
            hour: 0,
            name: ""
        }

    }

    render(){
        return(
            <div className="container">
                <h1>Működik mindig</h1>
                <input className="col-sm-4" type="text"></input>
                <input className="col-sm-4" type="text"></input>
            </div>
        );
    }
}

export default Calendar;
ReactDOM.render(<Calendar />, document.getElementById('root')); */


