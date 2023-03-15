# Simple Pickup Delivery Problem (PDP).
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import api_extractor
import pandas as pd

def create_data_model():
    """Stores the data for the problem."""
    df = pd.read_excel('addresses.xlsx')
    origins = df['Supplier Address'].tolist()
    destinations = df['Customer Address'].tolist()
    data = {}

    data['distance_matrix'] = api_extractor.distancebwnodes()
    #print(data['distance_matrix'])

    data['pickups_deliveries'] = [
    [5, 1], 
    [6, 2], 
    [7, 3],
    [8, 4], 
    ]

    #for i in range(len(origins)):
    #    data['pickups_deliveries'].APPEND(origins[i], destinations[i])
    
    data['num_vehicles'] = 4
    data['depot'] = 0
    return data

def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    print(f'Objective: {solution.ObjectiveValue()}')
    total_distance = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        route_distance = 0
        while not routing.IsEnd(index):
            plan_output += ' {} -> '.format(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id)
        plan_output += '{}\n'.format(manager.IndexToNode(index))
        plan_output += 'Distance of the route: {}m\n'.format(route_distance)
        print(plan_output)
        total_distance += route_distance
    print('Total Distance of all routes: {}m'.format(total_distance))

def main():
    """Entry point of the program."""
    # Instantiate the data problem.
    data = create_data_model()
    
    # Create the routing index manager.
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']), data['num_vehicles'], data['depot'])
    #print(manager)
    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Define cost of each arc.
    def distance_callback(from_index, to_index):
        """Returns the manhattan distance between the two nodes."""
        # Convert from routing variable Index to distance matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Distance constraint.
    dimension_name = 'Distance'
    routing.AddDimension(
        transit_callback_index,
        0,  # no slack
        150000000,  # vehicle maximum travel distance
        True,  # start cumul to zero
        dimension_name)
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(100)

    # Define capacity constraints
    demands = [0, -10, -2, -30, -20, 10, 2, 30, 20]
    demand_callback_index = routing.RegisterUnaryTransitCallback(lambda index: demands[manager.IndexToNode(index)])
    routing.AddDimensionWithVehicleCapacity(demand_callback_index, 0, [115,115,115,115], True, 'Capacity')

    # Define Transportation Requests.
    for request in data['pickups_deliveries']:
        pickup_index = manager.NodeToIndex(request[0])
        delivery_index = manager.NodeToIndex(request[1])
        routing.AddPickupAndDelivery(pickup_index, delivery_index)
        routing.solver().Add(
            routing.VehicleVar(pickup_index) == routing.VehicleVar(
                delivery_index))
        routing.solver().Add(
            distance_dimension.CumulVar(pickup_index) <=
            distance_dimension.CumulVar(delivery_index))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)

    # Print solution on console.
    if solution:
        print_solution(data, manager, routing, solution)
    else:
        print('No_Solution')

if __name__ == '__main__':
    main()