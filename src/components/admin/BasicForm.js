import React from "react";

const BasicForm = () => {
  return (
    <div>
      <div className="card w-full bg-base-100">
        <form className="card-body">
          <h1 className="font-bold">Basic</h1>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <label className="form-control col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">First Name</span>
              </div>
              <input
                type="text"
                placeholder="John"
                className="input input-bordered w-full font-bold"
              />
            </label>
            <label className="form-control col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="Doe"
                className="input input-bordered w-full font-bold"
              />
            </label>
            <label className="form-control col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">Email</span>
              </div>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="input input-bordered w-full font-bold"
              />
            </label>
            <label className="form-control col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">Password</span>
              </div>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered w-full font-bold"
              />
            </label>
            <label className="form-control  col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">Date of Birth</span>
              </div>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="input input-bordered w-full font-bold"
              />
            </label>
            <label className="form-control col-span-2 md:col-span-1 w-full">
              <div className="label">
                <span className="label-text font-bold">Country</span>
              </div>
              <select className="select select-bordered font-bold">
                <option value="" disabled>
                  Select Country
                </option>
                <option>UK</option>
                <option>USA</option>
                <option>Australia</option>
                <option>Germany</option>
              </select>
            </label>
            <label className="form-control col-span-2">
              <div className="label">
                <span className="label-text font-bold">Bio</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24 font-bold"
                placeholder="Bio"
              ></textarea>
            </label>
            <div className="form-control col-span-2">
              <div className="label">
                <span className="label-text font-bold">Gender</span>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center font-bold">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="female"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center ml-6 font-bold">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="male"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center ml-6 font-bold">
                  <input
                    type="radio"
                    className="form-radio"
                    name="gender"
                    value="other"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
            <div className="col-span-2">
              <input
                type="checkbox"
                id="termsconditions"
                name="termsconditions"
                value="termsconditions"
              />
              <label htmlFor="termsconditions" className="ml-2 font-bold">
                Agree to our terms and conditions
              </label>
            </div>
            <div className="flex justify-end col-span-2">
              <button className="btn w-24 bg-[#dc2626] text-white">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicForm;
