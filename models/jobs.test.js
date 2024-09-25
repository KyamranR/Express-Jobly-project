"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
const db = require("../db.js");
const Job = require("./jobs.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    title: "newJob",
    salary: 100000,
    equity: "0.1",
    companyHandle: "c1",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual({
      id: expect.any(Number),
      title: "newJob",
      salary: 100000,
      equity: "0.1",
      companyHandle: "c1",
    });
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "Job1",
        salary: 100000,
        equity: "0.1",
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "Job2",
        salary: 200000,
        equity: "0",
        companyHandle: "c2",
      },
      {
        id: expect.any(Number),
        title: "Job3",
        salary: 300000,
        equity: "0.2",
        companyHandle: "c3",
      },
    ]);
  });

  test("works: by minSalary", async function () {
    let jobs = await Job.findAll({ minSalary: 150000 });
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "Job2",
        salary: 200000,
        equity: "0",
        companyHandle: "c2",
      },
      {
        id: expect.any(Number),
        title: "Job3",
        salary: 300000,
        equity: "0.2",
        companyHandle: "c3",
      },
    ]);
  });

  test("works: by hasEquity", async function () {
    let jobs = await Job.findAll({ hasEquity: true });
    expect(jobs).toEqual([
      {
        id: expect.any(Number),
        title: "Job1",
        salary: 100000,
        equity: "0.1",
        companyHandle: "c1",
      },
      {
        id: expect.any(Number),
        title: "Job3",
        salary: 300000,
        equity: "0.2",
        companyHandle: "c3",
      },
    ]);
  });
});
