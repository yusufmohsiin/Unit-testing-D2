import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import catsMock from "../../../mocks/cats.json";
import Pets from "../Pets";
// import { userEvent } from "@testing-library/user-event";
import userEvent from '@testing-library/user-event';


const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);

describe("Here we test Pet component", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
  beforeEach(() => {
    render(<Pets />);
  });
  test("it should render 5 cards", async () => {
    const elemts = await screen.findAllByRole("article");
    expect(elemts.length).toEqual(5);
  });

  test("test if gender femail is selected,render only 3 cards", async () => {
    const elemts = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female")
    expect(screen.getAllByRole('article')).toStrictEqual([elemts[0],elemts[2],elemts[4]])
  });  

  test("test if cats are favoured", async()=>{
    const elemts = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/Favourite/i), "favoured")
    //expect(screen.getAllByRole("article")).toStrictEqual([elemts[0]])
  });

  test("test if cats are not favoured", async()=>{
    const elemts = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/Favourite/i), "not favoured");
    //expect(screen.getAllByRole("article")).toStrictEqual([elemts[1],elemts[2],elemts[3], elemts[4]])
  })

});
 