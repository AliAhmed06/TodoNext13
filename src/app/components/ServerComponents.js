import { TodoButton } from "./Clients"

export const TodoItem = ({id, title, description, completed}) => {
  return (
    <div className="flex items-center justify-between bg-gray-300 p-5 rounded-md mt-3">
        <div>
            <h4 className="font-bold">{title}</h4>
            <h4>{description}</h4>
        </div>

        <div>
          <TodoButton id={id} completed={completed} />
        </div>
    </div>
  )
}
