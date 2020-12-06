import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker';
import { useFilterProps } from '../../hooks/useWorkOuts';
import { format, addMonths } from 'date-fns'


const CustomInput = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} autoComplete="off" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"></input>
));

const Filters = ({ store }) => {
  const { register, handleSubmit, setValue, reset, watch, control } = useForm()
  const { setFilter, fitlersState } = useFilterProps(store)
  const minDate = new Date();
  const maxDate = addMonths(new Date(), 11);
  const onSubmit = (data) => {
    data.date = data.date ? format(data.date, 'MM-yyyy') : "";
    setFilter(data);
  }
  const defaultValues = {
    date: "",
    category: ""
  };
  const selectValue = watch("date");
  const handleChange = e => setValue("date", e.target.value);
  useEffect(() => {
    register({ name: "date" });
  }, [register]);
  const resetFilter = () => {
    setFilter(defaultValues);
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="mr-10 flex justify-end">
    <div className="my-6 grid grid-cols-1 gap-6 sm:mb-0 sm:gap-6 sm:grid-cols-3">
      <div className="py-2 flex">
        <label className="mx-1 py-2">Date:</label>
        <Controller
          as={
            <DatePicker
              selected={selectValue}
              dateFormat="MM-yyyy"
              showMonthYearPicker
              minDate={minDate}
              maxDate={maxDate}
              onChange={handleChange}
              customInput={<CustomInput />}
            />
          }
          control={control}
          name="date"
        />
      </div>
      <div className="py-2 flex">
        <label className="mx-1 py-2">Category: </label>
        <select name="category" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" ref={register}>
          <option></option>
          <option value="c1">c1</option>
          <option value="c2">c2</option>
          <option value="c3">c3</option>
        </select>
      </div>
      <div className="py-2">
        <button className="border border-gray-400	 py-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-white-400 hover:bg-white-400 text-gray font-normal py-2 px-4 mr-1 rounded" type="button" onClick={() => reset({ ...defaultValues })}>Reset</button>
        <button className="border py-2 transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-blue-400 hover:bg-blue-400 text-white font-normal py-2 px-4 mr-1 rounded" type="submit">Filter</button>
      </div>
    </div>
  </form>
}

export default Filters;