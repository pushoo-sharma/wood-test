import googlemaps
import pandas as pd

def distancebwnodes():
    gmaps = googlemaps.Client(key='AIzaSyCc7VXL-mK5i4ftwZARWdeLUKGVT-rWC0M')

    #set the mode of transportation
    mode = 'driving'

    #read excel file
    df = pd.read_excel('addresses.xlsx')

    #Extract the address from excel file
    origins = df['Supplier Address'].tolist()
    destinations = df['Customer Address'].tolist()

    #Initialize distance matrix
    dist_matrix = [[0 for x in range(len(destinations))] for y in range(len(origins))]
    time_matrix = [[0 for x in range(len(destinations))] for y in range(len(origins))]

    for i in range(len(origins)):
        for j in range(len(destinations)):
            result = gmaps.distance_matrix(origins[i], destinations[j])
            dist_matrix[i][j] = result['rows'][0]['elements'][0]['distance']['value']
            time_matrix[i][j] = result['rows'][0]['elements'][0]['duration']['value']
    '''
    #set1 = set(origins + destinations)
    #nodes = {}
    #for i in range(len(set1)):
    #    nodes[i] = list (set1)[i]
    #print(nodes)
    #Initialize distance matrix
    dist_matrix = [[0 for x in range(len(nodes))] for y in range(len(nodes))]
    time_matrix = [[0 for x in range(len(nodes))] for y in range(len(nodes))]
    #print(dist_matrix)
    #print(time_matrix)

    for i in range(len(nodes)):
        for j in range(len(nodes)):
            result = gmaps.distance_matrix(nodes[i], nodes[j])
            dist_matrix[i][j] = result['rows'][0]['elements'][0]['distance']['value']
            time_matrix[i][j] = result['rows'][0]['elements'][0]['duration']['value']
    '''
    #print(dist_matrix)
    return(dist_matrix)
