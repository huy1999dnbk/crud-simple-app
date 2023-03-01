import React from "react"
import {describe, expect, test} from "@jest/globals"
import {render, screen} from "@testing-library/react"
import TableUsersComponent from "./index"
import {User} from "../../utils/model"
import ReactDOM from "react-dom"
import {TableUsers, DataTypeUser} from "."
import "@testing-library/jest-dom"
const data = [
  {
    key: 0,
    _id: "63f9c38cc7efa1cf3683f07b",
    isActive: true,
    age: 29,
    name: "White Fleming",
  },
  {
    key: 1,
    _id: "63f9c38c3eae2b0e88b6a75d",
    isActive: false,
    age: 23,
    name: "Mason Frank",
  },
]
const props: TableUsers<DataTypeUser> = {
  dataUser: data,
  handleDeleteOneUser() {
    return
  },
  getUserWillBeRemove() {
    return
  },
}

describe("table", () => {
  test("render correctly", () => {
    render(<TableUsersComponent {...props} />)
    expect(screen.getByText(data[0].name))
  })
})
