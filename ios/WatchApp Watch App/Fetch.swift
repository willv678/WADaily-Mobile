//
//  Fetch.swift
//  WatchApp Watch App
//
//  Created by Will Varner on 9/10/22.
//

import Foundation

class apiCall {
    func getSchedule(completion:@escaping (ScheduleGroup) -> ()) {
        guard let url = URL(string: "https://wadaily.co/api/schedule") else { return }
        
        URLSession.shared.dataTask(with: url) { (data, _, _) in
            let schedules = try! JSONDecoder().decode(ScheduleGroup.self, from: data!)
            
            DispatchQueue.main.async {
                completion(schedules)
            }
        }
        .resume()
    }
}
